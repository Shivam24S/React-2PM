import { useState, useMemo } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Edit2,
  Trash2,
  Receipt,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useExpense } from "../../context/useExpense";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { calculateTotals } from "../../utils/calculations";
import TransactionFilters from "./TransactionFilters";
import ConfirmDialog from "../common/ConfirmDialog";

const TransactionList = () => {
  const {
    expenseList,
    handleEdit,
    handleDelete,
    settings,
    setIsAddModalOpen,
  } = useExpense();

  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filter & Sort State
  const [filters, setFilters] = useState({
    query: "",
    type: "all",
    category: "all",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    sortBy: "date",
    sortOrder: "desc",
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleResetFilters = () => {
    setFilters({
      query: "",
      type: "all",
      category: "all",
      startDate: "",
      endDate: "",
      minAmount: "",
      maxAmount: "",
      sortBy: "date",
      sortOrder: "desc",
    });
    setCurrentPage(1);
  };

  // Filtered & Sorted Transactions
  const filteredList = useMemo(() => {
    return expenseList.filter((item) => {
      // Title, Description, Tags search
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const titleMatch = item.Title?.toLowerCase().includes(q);
        const descMatch = item.Description?.toLowerCase().includes(q);
        const tagsMatch = item.Tags?.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !tagsMatch) return false;
      }

      // Type filter
      if (filters.type !== "all" && item.ExpenseType !== filters.type) {
        return false;
      }

      // Category filter
      if (filters.category !== "all" && item.Category !== filters.category) {
        return false;
      }

      // Date range filter
      if (filters.startDate && item.Date && item.Date < filters.startDate) {
        return false;
      }
      if (filters.endDate && item.Date && item.Date > filters.endDate) {
        return false;
      }

      // Amount range filter (Numeric comparisons)
      const amt = Number(item.Amount) || 0;
      if (filters.minAmount !== "" && amt < Number(filters.minAmount)) {
        return false;
      }
      if (filters.maxAmount !== "" && amt > Number(filters.maxAmount)) {
        return false;
      }

      return true;
    });
  }, [expenseList, filters]);

  // Sort list
  const sortedList = useMemo(() => {
    const list = [...filteredList];
    const isAsc = filters.sortOrder === "asc";

    return list.sort((a, b) => {
      if (filters.sortBy === "amount") {
        const amtA = Number(a.Amount) || 0;
        const amtB = Number(b.Amount) || 0;
        return isAsc ? amtA - amtB : amtB - amtA;
      }

      if (filters.sortBy === "title") {
        const titleA = (a.Title || "").toLowerCase();
        const titleB = (b.Title || "").toLowerCase();
        return isAsc ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
      }

      // Default: sort by Date
      const dateA = new Date(a.Date || 0).getTime();
      const dateB = new Date(b.Date || 0).getTime();
      return isAsc ? dateA - dateB : dateB - dateA;
    });
  }, [filteredList, filters.sortBy, filters.sortOrder]);

  // Derived filtered totals
  const filteredTotals = useMemo(() => {
    return calculateTotals(sortedList);
  }, [sortedList]);

  // Paginated chunk
  const totalPages = Math.ceil(sortedList.length / pageSize) || 1;
  const paginatedList = useMemo(() => {
    if (pageSize === -1) return sortedList; // All
    const start = (currentPage - 1) * pageSize;
    return sortedList.slice(start, start + pageSize);
  }, [sortedList, currentPage, pageSize]);

  return (
    <div className="page-container">
      {/* Top action header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-main)" }}>
            Transaction Records
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Search, filter, edit and track every expense and income item
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} />
          <span>New Transaction</span>
        </button>
      </div>

      {/* Advanced Filters Bar */}
      <TransactionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalCount={expenseList.length}
        filteredCount={sortedList.length}
        filteredTotals={filteredTotals}
        currency={settings.currency}
      />

      {/* Transactions Table & Mobile Card View */}
      <div className="card" style={{ padding: "0", overflow: "hidden" }}>
        {sortedList.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Receipt size={28} />
            </div>
            <h3 className="empty-state-title">No Transactions Match</h3>
            <p className="empty-state-text">
              Try adjusting your search criteria, dates, or clearing your active filters.
            </p>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title & Description</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedList.map((tx, idx) => {
                    const isCredit = tx.ExpenseType === "Credit";
                    const rowNumber = (currentPage - 1) * pageSize + idx + 1;

                    return (
                      <tr key={tx.id}>
                        <td style={{ color: "var(--text-subtle)", fontSize: "0.8rem", width: "40px" }}>
                          {rowNumber}
                        </td>

                        <td>
                          <div style={{ fontWeight: 600, color: "var(--text-main)" }}>
                            {tx.Title}
                          </div>
                          {tx.Description && (
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                              {tx.Description}
                            </div>
                          )}
                          {tx.Tags && (
                            <div style={{ fontSize: "0.7rem", color: "var(--text-subtle)", marginTop: "2px" }}>
                              🏷️ {tx.Tags}
                            </div>
                          )}
                        </td>

                        <td>
                          <span className="badge badge-neutral">
                            {tx.Category || "General"}
                          </span>
                        </td>

                        <td style={{ fontSize: "0.82rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                          {formatDate(tx.Date)}
                        </td>

                        <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                          {tx.PaymentMethod || "—"}
                        </td>

                        <td>
                          <span className={`badge ${isCredit ? "badge-income" : "badge-expense"}`}>
                            {isCredit ? (
                              <ArrowUpRight size={12} style={{ marginRight: 2 }} />
                            ) : (
                              <ArrowDownRight size={12} style={{ marginRight: 2 }} />
                            )}
                            {isCredit ? "Income" : "Expense"}
                          </span>
                        </td>

                        <td>
                          <span className={isCredit ? "amount-income" : "amount-expense"}>
                            {isCredit ? "+" : "-"}
                            {formatCurrency(tx.Amount, settings.currency)}
                          </span>
                        </td>

                        <td style={{ textAlign: "right" }}>
                          <div className="table-actions" style={{ justifyContent: "flex-end" }}>
                            <button
                              type="button"
                              className="btn-icon"
                              onClick={() => handleEdit(tx.id)}
                              title="Edit transaction"
                              aria-label={`Edit ${tx.Title}`}
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              type="button"
                              className="btn-icon"
                              onClick={() => setDeleteTarget(tx)}
                              title="Delete transaction"
                              aria-label={`Delete ${tx.Title}`}
                            >
                              <Trash2 size={15} style={{ color: "var(--expense)" }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="mobile-tx-cards" style={{ padding: "14px" }}>
              {paginatedList.map((tx) => {
                const isCredit = tx.ExpenseType === "Credit";
                return (
                  <div key={tx.id} className="mobile-tx-card">
                    <div className="mobile-tx-header">
                      <div>
                        <div className="mobile-tx-title">{tx.Title}</div>
                        {tx.Description && (
                          <div className="mobile-tx-desc">{tx.Description}</div>
                        )}
                      </div>
                      <span className={isCredit ? "amount-income" : "amount-expense"} style={{ fontSize: "1.05rem" }}>
                        {isCredit ? "+" : "-"}
                        {formatCurrency(tx.Amount, settings.currency)}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                      <span className={`badge ${isCredit ? "badge-income" : "badge-expense"}`}>
                        {isCredit ? "Income" : "Expense"}
                      </span>
                      <span className="badge badge-neutral">
                        {tx.Category}
                      </span>
                      {tx.PaymentMethod && (
                        <span className="badge badge-neutral" style={{ fontSize: "0.7rem" }}>
                          {tx.PaymentMethod}
                        </span>
                      )}
                    </div>

                    <div className="mobile-tx-meta">
                      <span>{formatDate(tx.Date)}</span>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button
                          type="button"
                          className="btn-icon"
                          style={{ width: "30px", height: "30px" }}
                          onClick={() => handleEdit(tx.id)}
                          aria-label={`Edit ${tx.Title}`}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon"
                          style={{ width: "30px", height: "30px" }}
                          onClick={() => setDeleteTarget(tx)}
                          aria-label={`Delete ${tx.Title}`}
                        >
                          <Trash2 size={14} style={{ color: "var(--expense)" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {sortedList.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  borderTop: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-subtle)",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  <span>Rows per page:</span>
                  <select
                    className="form-select"
                    style={{ width: "auto", padding: "4px 8px", fontSize: "0.8rem" }}
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      aria-label="Next page"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            handleDelete(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        title="Delete Transaction"
        message={
          deleteTarget
            ? `Are you sure you want to permanently delete "${deleteTarget.Title}" (${formatCurrency(
                deleteTarget.Amount,
                settings.currency,
              )})? This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  );
};

export default TransactionList;
