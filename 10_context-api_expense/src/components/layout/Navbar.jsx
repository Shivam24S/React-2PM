import { Menu, Plus, Sun, Moon } from "lucide-react";
import { useExpense } from "../../context/useExpense";
import { CURRENCIES } from "../../constants";

const VIEW_TITLES = {
  dashboard: { title: "Dashboard", subtitle: "Financial summary & overview" },
  transactions: { title: "Transactions", subtitle: "Manage your income and expenses" },
  analytics: { title: "Analytics", subtitle: "Deep-dive financial reports & trends" },
  budgets: { title: "Budgets", subtitle: "Monthly limits & category targets" },
  settings: { title: "Settings", subtitle: "Data backup, preferences & theme" },
};

const Navbar = ({ onOpenMobileMenu }) => {
  const {
    activeView,
    settings,
    handleToggleTheme,
    handleUpdateSettings,
    setIsAddModalOpen,
  } = useExpense();

  const currentViewInfo = VIEW_TITLES[activeView] || {
    title: "ExpenseFlow",
    subtitle: "Personal Finance",
  };

  // Formatted date string
  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleCurrencyChange = (e) => {
    handleUpdateSettings({ currency: e.target.value });
  };

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="btn-icon mobile-menu-btn"
          onClick={onOpenMobileMenu}
          aria-label="Open mobile menu"
        >
          <Menu size={20} />
        </button>

        <div className="navbar-page-info">
          <h1 className="navbar-title">{currentViewInfo.title}</h1>
          <span className="navbar-date">
            {todayStr} • {currentViewInfo.subtitle}
          </span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Quick Currency Selector */}
        <select
          value={settings.currency || "INR"}
          onChange={handleCurrencyChange}
          className="form-select"
          style={{ width: "auto", padding: "6px 10px", fontSize: "0.82rem" }}
          aria-label="Select display currency"
        >
          {CURRENCIES.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.code} ({curr.symbol})
            </option>
          ))}
        </select>

        {/* Theme Toggle Button */}
        <button
          type="button"
          className="btn-icon"
          onClick={handleToggleTheme}
          title={`Switch to ${settings.theme === "dark" ? "light" : "dark"} mode`}
          aria-label="Toggle color theme"
        >
          {settings.theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Quick Add Transaction Button */}
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} />
          <span>Add Transaction</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
