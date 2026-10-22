import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { useExpense } from "../../context/useExpense";
import { formatCurrency, formatPercent } from "../../utils/formatters";

const SummaryCards = () => {
  const { credit, debit, balance, savingsRate, settings, expenseList } = useExpense();
  const currency = settings.currency || "INR";

  // Derive number of income and expense items
  const creditCount = expenseList.filter((t) => t.ExpenseType === "Credit").length;
  const debitCount = expenseList.filter((t) => t.ExpenseType === "Debit").length;

  return (
    <div className="summary-cards-grid">
      {/* 1. Total Balance Card */}
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Total Net Balance</span>
          <div className="stat-icon-wrapper stat-icon-balance">
            <Wallet size={19} />
          </div>
        </div>
        <div
          className="stat-card-value"
          style={{ color: balance >= 0 ? "var(--text-main)" : "var(--expense)" }}
        >
          {formatCurrency(balance, currency)}
        </div>
        <div className="stat-card-footer">
          <span>Overall Net Position ({expenseList.length} transactions)</span>
        </div>
      </div>

      {/* 2. Total Income Card */}
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Total Income</span>
          <div className="stat-icon-wrapper stat-icon-income">
            <TrendingUp size={19} />
          </div>
        </div>
        <div className="stat-card-value" style={{ color: "var(--income)" }}>
          {formatCurrency(credit, currency)}
        </div>
        <div className="stat-card-footer">
          <span>{creditCount} Credit records logged</span>
        </div>
      </div>

      {/* 3. Total Expenses Card */}
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Total Expenses</span>
          <div className="stat-icon-wrapper stat-icon-expense">
            <TrendingDown size={19} />
          </div>
        </div>
        <div className="stat-card-value" style={{ color: "var(--expense)" }}>
          {formatCurrency(debit, currency)}
        </div>
        <div className="stat-card-footer">
          <span>{debitCount} Debit records logged</span>
        </div>
      </div>

      {/* 4. Savings Rate Card */}
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Savings Rate</span>
          <div className="stat-icon-wrapper stat-icon-savings">
            <PiggyBank size={19} />
          </div>
        </div>
        <div
          className="stat-card-value"
          style={{
            color: savingsRate >= 20 ? "var(--income)" : "var(--text-main)",
          }}
        >
          {formatPercent(savingsRate)}
        </div>
        <div className="stat-card-footer">
          <span>
            {credit > 0
              ? `${formatCurrency(Math.max(0, balance), currency)} saved of total income`
              : "Awaiting income records"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
