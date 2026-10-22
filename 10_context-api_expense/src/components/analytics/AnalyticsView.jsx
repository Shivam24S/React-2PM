import { useState, useMemo } from "react";
import {
  PieChart as PieIcon,
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  Layers,
} from "lucide-react";
import { useExpense } from "../../context/useExpense";
import {
  calculateTotals,
  aggregateCategorySpending,
  aggregateCashFlowByMonth,
} from "../../utils/calculations";
import { formatCurrency, formatPercent } from "../../utils/formatters";
import CashFlowChart from "../dashboard/CashFlowChart";
import CategoryChart from "../dashboard/CategoryChart";

const AnalyticsView = () => {
  const { expenseList, settings } = useExpense();
  const [period, setPeriod] = useState("all"); // 'all', 'thisMonth', 'last30', 'thisYear'

  // Filter transactions by selected period
  const filteredData = useMemo(() => {
    if (!expenseList || expenseList.length === 0) return [];
    if (period === "all") return expenseList;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = `${currentYear}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    return expenseList.filter((item) => {
      if (!item.Date) return false;

      if (period === "thisMonth") {
        return item.Date.startsWith(currentMonth);
      }

      if (period === "thisYear") {
        return item.Date.startsWith(String(currentYear));
      }

      if (period === "last30") {
        const itemDate = new Date(item.Date).getTime();
        const thirtyDaysAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;
        return itemDate >= thirtyDaysAgo;
      }

      return true;
    });
  }, [expenseList, period]);

  // Calculations for lifetime vs period
  const lifetimeTotals = useMemo(() => calculateTotals(expenseList), [expenseList]);
  const periodTotals = useMemo(() => calculateTotals(filteredData), [filteredData]);
  const categoryBreakdown = useMemo(() => aggregateCategorySpending(filteredData), [filteredData]);
  const monthlyFlow = useMemo(() => aggregateCashFlowByMonth(filteredData), [filteredData]);

  // Derived metrics
  const debits = filteredData.filter((t) => t.ExpenseType === "Debit");
  const credits = filteredData.filter((t) => t.ExpenseType === "Credit");

  const avgExpense =
    debits.length > 0
      ? debits.reduce((acc, d) => acc + (Number(d.Amount) || 0), 0) / debits.length
      : 0;

  const largestTx = filteredData.reduce((max, t) => {
    const amt = Number(t.Amount) || 0;
    return !max || amt > Number(max.Amount) ? t : max;
  }, null);

  return (
    <div className="page-container">
      {/* Top Controls Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-main)" }}>
            Financial Analytics & Reports
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Inspect spending distribution, net savings ratios, and historical cash flow
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div style={{ display: "flex", background: "var(--bg-subtle)", padding: "3px", borderRadius: "var(--radius-md)" }}>
          {[
            { id: "all", label: "All Time" },
            { id: "thisMonth", label: "This Month" },
            { id: "last30", label: "Last 30 Days" },
            { id: "thisYear", label: "This Year" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPeriod(tab.id)}
              style={{
                padding: "6px 12px",
                fontSize: "0.8rem",
                fontWeight: period === tab.id ? 600 : 500,
                borderRadius: "var(--radius-sm)",
                backgroundColor: period === tab.id ? "var(--bg-card)" : "transparent",
                color: period === tab.id ? "var(--primary)" : "var(--text-muted)",
                boxShadow: period === tab.id ? "var(--shadow-xs)" : "none",
                transition: "all var(--transition-fast)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Period Metrics Grid */}
      <div className="summary-cards-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Period Inflow (Income)</span>
            <div className="stat-icon-wrapper stat-icon-income">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: "var(--income)" }}>
            {formatCurrency(periodTotals.credit, settings.currency)}
          </div>
          <div className="stat-card-footer">
            <span>{credits.length} credit entries in selected scope</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Period Outflow (Expenses)</span>
            <div className="stat-icon-wrapper stat-icon-expense">
              <TrendingDown size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: "var(--expense)" }}>
            {formatCurrency(periodTotals.debit, settings.currency)}
          </div>
          <div className="stat-card-footer">
            <span>{debits.length} debit entries in selected scope</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Period Net Balance</span>
            <div className="stat-icon-wrapper stat-icon-balance">
              <Wallet size={18} />
            </div>
          </div>
          <div
            className="stat-card-value"
            style={{ color: periodTotals.balance >= 0 ? "var(--income)" : "var(--expense)" }}
          >
            {formatCurrency(periodTotals.balance, settings.currency)}
          </div>
          <div className="stat-card-footer">
            <span>Savings Rate: {formatPercent(periodTotals.savingsRate)}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Average Expense Ticket</span>
            <div className="stat-icon-wrapper stat-icon-savings">
              <Activity size={18} />
            </div>
          </div>
          <div className="stat-card-value">
            {formatCurrency(avgExpense, settings.currency)}
          </div>
          <div className="stat-card-footer">
            <span>
              Largest: {largestTx ? formatCurrency(largestTx.Amount, settings.currency) : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="dashboard-charts-grid">
        <CashFlowChart />
        <CategoryChart />
      </div>

      {/* Category Spending Breakdown Detailed Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border-color)" }}>
          <div className="card-title">
            <Layers size={18} />
            <span>Category Spending Rank ({filteredData.length} entries analyzed)</span>
          </div>
          <div className="card-subtitle">
            Ranked expense breakdown with aggregate totals and portfolio shares
          </div>
        </div>

        {categoryBreakdown.categories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <PieIcon size={24} />
            </div>
            <h3 className="empty-state-title">No Debit Transactions in this Scope</h3>
            <p className="empty-state-text">
              Try switching your scope filter to "All Time" to analyze historical data.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Spent</th>
                  <th>Share of Outflow</th>
                  <th style={{ width: "35%" }}>Relative Visual Proportion</th>
                </tr>
              </thead>
              <tbody>
                {categoryBreakdown.categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: cat.color,
                            display: "inline-block",
                          }}
                        />
                        <span>{cat.label}</span>
                      </div>
                    </td>

                    <td style={{ fontWeight: 600, color: "var(--text-main)" }}>
                      {formatCurrency(cat.amount, settings.currency)}
                    </td>

                    <td>
                      <span className="badge badge-neutral">
                        {formatPercent(cat.percentage)}
                      </span>
                    </td>

                    <td>
                      <div className="budget-progress-container" style={{ margin: 0, height: "8px" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${cat.percentage}%`,
                            backgroundColor: cat.color,
                            borderRadius: "var(--radius-full)",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lifetime Scope Footnote */}
      <div
        style={{
          padding: "14px 20px",
          backgroundColor: "var(--bg-subtle)",
          borderRadius: "var(--radius-md)",
          fontSize: "0.82rem",
          color: "var(--text-muted)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span>
          <strong>Lifetime All-Time Totals:</strong> Income: {formatCurrency(lifetimeTotals.credit, settings.currency)} | Expenses: {formatCurrency(lifetimeTotals.debit, settings.currency)} | Net Balance: {formatCurrency(lifetimeTotals.balance, settings.currency)}
        </span>
        <span>{monthlyFlow.length} distinct monthly billing periods tracked</span>
      </div>
    </div>
  );
};

export default AnalyticsView;
