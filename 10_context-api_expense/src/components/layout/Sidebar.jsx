import {
  LayoutDashboard,
  Receipt,
  PieChart,
  PiggyBank,
  Settings as SettingsIcon,
  WalletCards,
  X,
} from "lucide-react";
import { useExpense } from "../../context/useExpense";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: Receipt },
  { id: "analytics", label: "Analytics", icon: PieChart },
  { id: "budgets", label: "Budgets", icon: PiggyBank },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { activeView, setActiveView, expenseList, settings } = useExpense();

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`app-sidebar ${isOpen ? "open" : ""}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-icon">
            <WalletCards size={22} />
          </div>
          <div className="brand-title">
            ExpenseFlow
            <span className="brand-subtitle">Finance Suite</span>
          </div>

          {/* Close button for mobile drawer */}
          <button
            type="button"
            className="btn-icon mobile-menu-btn"
            style={{ marginLeft: "auto" }}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="nav-item-icon">
                  <Icon size={18} />
                </span>
                <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
                {item.id === "transactions" && expenseList.length > 0 && (
                  <span className="badge badge-neutral" style={{ fontSize: "0.7rem", padding: "2px 7px" }}>
                    {expenseList.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="sidebar-footer">
          <div className="user-badge">
            <div className="user-avatar">
              {settings.userName ? settings.userName.charAt(0).toUpperCase() : "P"}
            </div>
            <div className="user-info">
              <span className="user-name">{settings.userName || "Personal Account"}</span>
              <span className="user-role">Client Storage</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
