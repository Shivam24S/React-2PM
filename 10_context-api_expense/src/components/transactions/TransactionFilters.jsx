import { Search, RotateCcw, ArrowUpDown, Filter } from "lucide-react";
import { CATEGORIES } from "../../constants";
import { formatCurrency } from "../../utils/formatters";

const TransactionFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
  filteredCount,
  filteredTotals,
  currency,
}) => {
  const hasActiveFilters =
    filters.query !== "" ||
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.startDate !== "" ||
    filters.endDate !== "" ||
    filters.minAmount !== "" ||
    filters.maxAmount !== "" ||
    filters.sortBy !== "date" ||
    filters.sortOrder !== "desc";

  return (
    <div className="filter-bar">
      {/* Row 1: Search & Main Dropdowns */}
      <div className="filter-row">
        {/* Search Input */}
        <div className="filter-search-box">
          <Search size={16} className="filter-search-icon" />
          <input
            type="text"
            className="form-input"
            placeholder="Search by title, description or tag..."
            value={filters.query}
            onChange={(e) => onFilterChange("query", e.target.value)}
          />
        </div>

        {/* Type Filter */}
        <div className="filter-item">
          <select
            className="form-select"
            value={filters.type}
            onChange={(e) => onFilterChange("type", e.target.value)}
            aria-label="Filter by transaction type"
          >
            <option value="all">All Types</option>
            <option value="Credit">Income (Credit)</option>
            <option value="Debit">Expense (Debit)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-item">
          <select
            className="form-select"
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Field */}
        <div className="filter-item">
          <select
            className="form-select"
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
            aria-label="Sort transactions by"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>

        {/* Sort Order Direction Toggle */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            onFilterChange("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")
          }
          title={`Currently ${filters.sortOrder === "asc" ? "Ascending" : "Descending"}. Click to toggle.`}
          aria-label="Toggle sort direction"
        >
          <ArrowUpDown size={15} />
          <span>{filters.sortOrder === "asc" ? "Asc" : "Desc"}</span>
        </button>

        {/* Reset / Clear Filters */}
        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={onResetFilters}
            title="Reset all search criteria"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Row 2: Secondary Filters (Date & Amount Ranges) */}
      <div className="filter-row" style={{ gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          <Filter size={14} />
          <span>Date range:</span>
        </div>

        <input
          type="date"
          className="form-input"
          style={{ width: "auto", padding: "6px 10px", fontSize: "0.82rem" }}
          value={filters.startDate}
          onChange={(e) => onFilterChange("startDate", e.target.value)}
          aria-label="Filter start date"
        />

        <span style={{ fontSize: "0.82rem", color: "var(--text-subtle)" }}>to</span>

        <input
          type="date"
          className="form-input"
          style={{ width: "auto", padding: "6px 10px", fontSize: "0.82rem" }}
          value={filters.endDate}
          onChange={(e) => onFilterChange("endDate", e.target.value)}
          aria-label="Filter end date"
        />

        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "10px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          <span>Amount:</span>
        </div>

        <input
          type="number"
          placeholder="Min"
          className="form-input"
          style={{ width: "90px", padding: "6px 10px", fontSize: "0.82rem" }}
          value={filters.minAmount}
          onChange={(e) => onFilterChange("minAmount", e.target.value)}
          aria-label="Minimum amount filter"
        />

        <span style={{ fontSize: "0.82rem", color: "var(--text-subtle)" }}>-</span>

        <input
          type="number"
          placeholder="Max"
          className="form-input"
          style={{ width: "90px", padding: "6px 10px", fontSize: "0.82rem" }}
          value={filters.maxAmount}
          onChange={(e) => onFilterChange("maxAmount", e.target.value)}
          aria-label="Maximum amount filter"
        />
      </div>

      {/* Filter Statistics Summary Strip */}
      <div className="filter-stats-strip">
        <div>
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> transactions
        </div>
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <span>
            Filtered Income:{" "}
            <strong style={{ color: "var(--income)" }}>
              {formatCurrency(filteredTotals.credit, currency)}
            </strong>
          </span>
          <span>
            Filtered Expense:{" "}
            <strong style={{ color: "var(--expense)" }}>
              {formatCurrency(filteredTotals.debit, currency)}
            </strong>
          </span>
          <span>
            Net:{" "}
            <strong
              style={{
                color: filteredTotals.balance >= 0 ? "var(--income)" : "var(--expense)",
              }}
            >
              {formatCurrency(filteredTotals.balance, currency)}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
