import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Edit2, Trash2, Clock, ChevronRight } from "lucide-react";
import { useExpense } from "../../context/useExpense";
import { formatCurrency, formatDate } from "../../utils/formatters";
import ConfirmDialog from "../common/ConfirmDialog";

const RecentTransactions = () => {
  const { expenseList, handleEdit, handleDelete, settings, setActiveView } = useExpense();
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Take most recent 5 transactions
  const recentList = [...expenseList]
    .sort((a, b) => new Date(b.Date || 0) - new Date(a.Date || 0))
    .slice(0, 5);

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      <div className="card-header">
        <div>
          <div className="card-title">
            <Clock size={18} />
            <span>Recent Transactions</span>
          </div>
          <div className="card-subtitle">Your latest financial activities</div>
        </div>

        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => setActiveView("transactions")}
        >
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {recentList.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Clock size={24} />
          </div>
          <h3 className="empty-state-title">No Transactions Yet</h3>
          <p className="empty-state-text">
            Get started by recording your first income or expense transaction.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title & Category</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentList.map((tx) => {
                const isCredit = tx.ExpenseType === "Credit";
                return (
                  <tr key={tx.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--text-main)" }}>
                        {tx.Title}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        {tx.Category}
                      </div>
                    </td>

                    <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                      {formatDate(tx.Date, true)}
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
      )}

      {/* Delete Confirmation Modal */}
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
            ? `Are you sure you want to delete "${deleteTarget.Title}" (${formatCurrency(
                deleteTarget.Amount,
                settings.currency,
              )})? This cannot be undone.`
            : ""
        }
        confirmLabel="Delete Transaction"
        confirmVariant="danger"
      />
    </div>
  );
};

export default RecentTransactions;
