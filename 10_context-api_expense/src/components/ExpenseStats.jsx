import { useExpense } from "../context/useExpense";
import { formatCurrency, formatPercent } from "../utils/formatters";

const ExpenseStats = () => {
  const { credit, debit, balance, savingsRate, settings } = useExpense();
  const curr = settings?.currency || "INR";

  return (
    <div className="summary-cards-grid">
      <div className="stat-card">
        <span className="stat-card-label">Total Credit (Income)</span>
        <div className="stat-card-value" style={{ color: "var(--income)" }}>
          {formatCurrency(credit, curr)}
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-card-label">Total Debit (Expense)</span>
        <div className="stat-card-value" style={{ color: "var(--expense)" }}>
          {formatCurrency(debit, curr)}
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-card-label">Net Balance</span>
        <div className="stat-card-value" style={{ color: balance >= 0 ? "var(--text-main)" : "var(--expense)" }}>
          {formatCurrency(balance, curr)}
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-card-label">Savings Rate</span>
        <div className="stat-card-value">
          {formatPercent(savingsRate)}
        </div>
      </div>
    </div>
  );
};

export default ExpenseStats;