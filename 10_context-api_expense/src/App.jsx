import { useState } from "react";
import { useExpense } from "./context/useExpense";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import DashboardView from "./components/dashboard/DashboardView";
import TransactionList from "./components/transactions/TransactionList";
import AnalyticsView from "./components/analytics/AnalyticsView";
import BudgetManager from "./components/budgets/BudgetManager";
import SettingsView from "./components/settings/SettingsView";
import TransactionFormModal from "./components/transactions/TransactionFormModal";
import Toast from "./components/common/Toast";
import "./App.css";

const App = () => {
  const { activeView, toasts, removeToast } = useExpense();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      {/* Sidebar Navigation (Desktop sticky + Mobile drawer) */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="app-main">
        {/* Top Navbar */}
        <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Dynamic View Content based on client navigation */}
        <main>
          {activeView === "dashboard" && <DashboardView />}
          {activeView === "transactions" && <TransactionList />}
          {activeView === "analytics" && <AnalyticsView />}
          {activeView === "budgets" && <BudgetManager />}
          {activeView === "settings" && <SettingsView />}
        </main>
      </div>

      {/* Global Transaction Modal for Add and Edit flows */}
      <TransactionFormModal />

      {/* Non-blocking feedback toast notifications */}
      <Toast toasts={toasts} onClose={removeToast} />
    </div>
  );
};

export default App;