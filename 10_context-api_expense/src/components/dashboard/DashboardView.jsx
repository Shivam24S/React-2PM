import SummaryCards from "./SummaryCards";
import CashFlowChart from "./CashFlowChart";
import CategoryChart from "./CategoryChart";
import RecentTransactions from "./RecentTransactions";
import SpendingInsights from "./SpendingInsights";

const DashboardView = () => {
  return (
    <div className="page-container">
      {/* 4 Summary Stat Cards */}
      <SummaryCards />

      {/* Charts Grid: Monthly Cash Flow (2fr) + Category Donut (1fr) */}
      <div className="dashboard-charts-grid">
        <CashFlowChart />
        <CategoryChart />
      </div>

      {/* Bottom Grid: Recent Transactions (2fr) + Insights (1fr) */}
      <div className="dashboard-bottom-grid">
        <RecentTransactions />
        <SpendingInsights />
      </div>
    </div>
  );
};

export default DashboardView;
