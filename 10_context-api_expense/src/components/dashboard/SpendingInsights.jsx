import { Sparkles, AlertTriangle, ArrowUp, ArrowDown, Award } from "lucide-react";
import { useExpense } from "../../context/useExpense";
import { calculateSpendingInsights, calculateBudgetUsage } from "../../utils/calculations";
import { formatCurrency, formatPercent } from "../../utils/formatters";

const SpendingInsights = () => {
  const { expenseList, budgets, settings, setActiveView } = useExpense();

  const insights = calculateSpendingInsights(expenseList);
  const budgetUsage = calculateBudgetUsage(budgets, expenseList);

  const exceededBudgets = budgetUsage.items.filter((b) => b.isOver);
  const warningBudgets = budgetUsage.items.filter((b) => b.isWarning);

  const { topCategory, largestExpense, currentMonthSummary } = insights;
  const netThisMonth = currentMonthSummary.income - currentMonthSummary.expense;

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="card-header" style={{ marginBottom: 0 }}>
        <div>
          <div className="card-title">
            <Sparkles size={18} style={{ color: "var(--warning)" }} />
            <span>Spending Insights</span>
          </div>
          <div className="card-subtitle">Deterministic analytics from your records</div>
        </div>
      </div>

      {/* Budget Exceeded or Warning Alert */}
      {exceededBudgets.length > 0 && (
        <div
          style={{
            backgroundColor: "var(--expense-bg)",
            border: "1px solid var(--expense-border)",
            borderRadius: "var(--radius-md)",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            fontSize: "0.82rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--expense)" }}>
            <AlertTriangle size={16} style={{ flexShrink: 0 }} />
            <span>
              <strong>Budget alert:</strong> {exceededBudgets.length} category exceeded monthly limit!
            </span>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            style={{ padding: "3px 8px", fontSize: "0.75rem" }}
            onClick={() => setActiveView("budgets")}
          >
            Review
          </button>
        </div>
      )}

      {exceededBudgets.length === 0 && warningBudgets.length > 0 && (
        <div
          style={{
            backgroundColor: "var(--warning-bg)",
            border: "1px solid var(--warning-border)",
            borderRadius: "var(--radius-md)",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.82rem",
            color: "var(--warning-text)",
          }}
        >
          <AlertTriangle size={16} style={{ flexShrink: 0 }} />
          <span>
            {warningBudgets.length} category is nearing 80% of its budget limit.
          </span>
        </div>
      )}

      {/* Insight Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Top Category */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            backgroundColor: "var(--bg-subtle)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Award size={18} style={{ color: topCategory?.color || "var(--primary)" }} />
            <div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Top Spending Category
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-main)" }}>
                {topCategory ? topCategory.label : "None recorded"}
              </div>
            </div>
          </div>
          {topCategory && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                {formatCurrency(topCategory.amount, settings.currency)}
              </div>
              <span className="badge badge-neutral" style={{ fontSize: "0.7rem" }}>
                {formatPercent(topCategory.percentage)} of debits
              </span>
            </div>
          )}
        </div>

        {/* Largest Single Expense */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            backgroundColor: "var(--bg-subtle)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ArrowDown size={18} style={{ color: "var(--expense)" }} />
            <div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Largest Single Expense
              </div>
              <div
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "var(--text-main)",
                  maxWidth: "140px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {largestExpense ? largestExpense.Title : "No expenses"}
              </div>
            </div>
          </div>
          {largestExpense && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 600, color: "var(--expense)", fontSize: "0.9rem" }}>
                {formatCurrency(largestExpense.Amount, settings.currency)}
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                {largestExpense.Date}
              </span>
            </div>
          )}
        </div>

        {/* Current Month Net Flow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            backgroundColor: "var(--bg-subtle)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {netThisMonth >= 0 ? (
              <ArrowUp size={18} style={{ color: "var(--income)" }} />
            ) : (
              <ArrowDown size={18} style={{ color: "var(--expense)" }} />
            )}
            <div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                This Month Net Cashflow
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-main)" }}>
                {currentMonthSummary.count} transactions in {currentMonthSummary.key}
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontWeight: 600,
                color: netThisMonth >= 0 ? "var(--income)" : "var(--expense)",
                fontSize: "0.9rem",
              }}
            >
              {netThisMonth >= 0 ? "+" : ""}
              {formatCurrency(netThisMonth, settings.currency)}
            </div>
            <span style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
              Income: {formatCurrency(currentMonthSummary.income, settings.currency)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;
