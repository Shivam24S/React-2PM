import { useState } from "react";
import { PiggyBank, Plus, Edit2, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useExpense } from "../../context/useExpense";
import { calculateBudgetUsage } from "../../utils/calculations";
import { formatCurrency, formatPercent } from "../../utils/formatters";
import BudgetModal from "./BudgetModal";
import ConfirmDialog from "../common/ConfirmDialog";

const BudgetManager = () => {
  const {
    budgets,
    expenseList,
    handleAddBudget,
    handleDeleteBudget,
    settings,
  } = useExpense();

  const [targetMonth, setTargetMonth] = useState("2026-10");
  const [modalState, setModalState] = useState({ isOpen: false, budget: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const budgetUsage = calculateBudgetUsage(budgets, expenseList, targetMonth);

  return (
    <div className="page-container">
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-main)" }}>
            Monthly Budget Management
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Plan category spending limits and monitor actual debit consumption
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="month"
            className="form-input"
            style={{ width: "auto", padding: "7px 12px", fontSize: "0.85rem" }}
            value={targetMonth}
            onChange={(e) => setTargetMonth(e.target.value)}
            aria-label="Select budget month"
          />

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalState({ isOpen: true, budget: null })}
          >
            <Plus size={16} />
            <span>Add Category Budget</span>
          </button>
        </div>
      </div>

      {/* Overall Total Monthly Budget Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <PiggyBank size={18} />
              <span>Overall Monthly Budget Allocation ({targetMonth})</span>
            </div>
            <div className="card-subtitle">
              Cumulative spending against all configured category caps
            </div>
          </div>
          <div>
            <span
              className={`badge ${
                budgetUsage.isTotalOver
                  ? "badge-expense"
                  : budgetUsage.totalPercentage >= 80
                  ? "badge-warning"
                  : "badge-income"
              }`}
            >
              {budgetUsage.isTotalOver
                ? "Exceeded Total Limit"
                : `${formatPercent(budgetUsage.totalPercentage)} Utilized`}
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Total Budget Limit</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)" }}>
              {formatCurrency(budgetUsage.totalBudgetLimit, settings.currency)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Total Spent</div>
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: budgetUsage.isTotalOver ? "var(--expense)" : "var(--text-main)",
              }}
            >
              {formatCurrency(budgetUsage.totalBudgetSpent, settings.currency)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Remaining Balance</div>
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: budgetUsage.totalRemaining > 0 ? "var(--income)" : "var(--expense)",
              }}
            >
              {formatCurrency(budgetUsage.totalRemaining, settings.currency)}
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="budget-progress-container" style={{ height: "12px" }}>
          <div
            className={`budget-progress-bar ${
              budgetUsage.isTotalOver
                ? "budget-progress-exceeded"
                : budgetUsage.totalPercentage >= 80
                ? "budget-progress-warning"
                : "budget-progress-normal"
            }`}
            style={{ width: `${Math.min(100, budgetUsage.totalPercentage)}%` }}
          />
        </div>
      </div>

      {/* Category Budgets Grid */}
      {budgetUsage.items.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">
              <PiggyBank size={28} />
            </div>
            <h3 className="empty-state-title">No Category Budgets Set</h3>
            <p className="empty-state-text">
              Set monthly spending targets for categories like Food, Travel, or Shopping to prevent overspending.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setModalState({ isOpen: true, budget: null })}
            >
              Create First Budget
            </button>
          </div>
        </div>
      ) : (
        <div className="budgets-grid">
          {budgetUsage.items.map((item) => (
            <div key={item.id} className="budget-card">
              <div className="budget-card-header">
                <div className="budget-card-category">
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: item.categoryColor,
                      display: "inline-block",
                    }}
                  />
                  <span>{item.categoryLabel}</span>
                </div>

                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    type="button"
                    className="btn-icon"
                    style={{ width: 28, height: 28 }}
                    onClick={() => setModalState({ isOpen: true, budget: item })}
                    title="Edit budget"
                    aria-label={`Edit ${item.categoryLabel} budget`}
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    className="btn-icon"
                    style={{ width: 28, height: 28 }}
                    onClick={() => setDeleteTarget(item)}
                    title="Delete budget"
                    aria-label={`Delete ${item.categoryLabel} budget`}
                  >
                    <Trash2 size={13} style={{ color: "var(--expense)" }} />
                  </button>
                </div>
              </div>

              {/* Amounts row */}
              <div className="budget-amounts">
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    Spent
                  </span>
                  <span className="budget-spent" style={{ color: item.isOver ? "var(--expense)" : "var(--text-main)" }}>
                    {formatCurrency(item.spent, settings.currency)}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    Limit
                  </span>
                  <span className="budget-limit">
                    {formatCurrency(item.limit, settings.currency)}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="budget-progress-container">
                <div
                  className={`budget-progress-bar ${
                    item.isOver
                      ? "budget-progress-exceeded"
                      : item.isWarning
                      ? "budget-progress-warning"
                      : "budget-progress-normal"
                  }`}
                  style={{ width: `${Math.min(100, item.percentage)}%` }}
                />
              </div>

              {/* Footer status & remaining */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem" }}>
                <span style={{ color: "var(--text-muted)" }}>
                  {item.isOver
                    ? `${formatCurrency(item.spent - item.limit, settings.currency)} over limit`
                    : `${formatCurrency(item.remaining, settings.currency)} left`}
                </span>

                <span
                  className={`badge ${
                    item.isOver
                      ? "badge-expense"
                      : item.isWarning
                      ? "badge-warning"
                      : "badge-income"
                  }`}
                  style={{ fontSize: "0.7rem" }}
                >
                  {item.isOver ? (
                    <AlertCircle size={11} style={{ marginRight: 2 }} />
                  ) : (
                    <CheckCircle2 size={11} style={{ marginRight: 2 }} />
                  )}
                  {item.isOver ? "Exceeded" : item.isWarning ? "Near Limit" : "On Track"} ({formatPercent(item.percentage)})
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Budget Modal */}
      <BudgetModal
        isOpen={modalState.isOpen}
        initialBudget={modalState.budget}
        onClose={() => setModalState({ isOpen: false, budget: null })}
        onSave={(data) => handleAddBudget(data)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            handleDeleteBudget(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        title="Delete Budget"
        message={
          deleteTarget
            ? `Are you sure you want to delete the monthly budget for "${deleteTarget.categoryLabel}"?`
            : ""
        }
        confirmLabel="Delete Budget"
        confirmVariant="danger"
      />
    </div>
  );
};

export default BudgetManager;
