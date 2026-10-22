import { useState } from "react";
import Modal from "../common/Modal";
import { CATEGORIES } from "../../constants";
import { validateBudget } from "../../utils/validation";

const BudgetModal = ({ isOpen, onClose, onSave, initialBudget = null }) => {
  const [formData, setFormData] = useState({
    category: "Food&Dining",
    limit: "",
    month: "2026-10",
  });

  const [syncedId, setSyncedId] = useState(null);
  const [errors, setErrors] = useState({});

  if (isOpen && initialBudget && initialBudget.id !== syncedId) {
    setFormData({
      id: initialBudget.id,
      category: initialBudget.category || "Food&Dining",
      limit: String(initialBudget.limit || ""),
      month: initialBudget.month || "2026-10",
    });
    setSyncedId(initialBudget.id);
    setErrors({});
  } else if (isOpen && !initialBudget && syncedId !== "new") {
    setFormData({
      category: "Food&Dining",
      limit: "",
      month: "2026-10",
    });
    setSyncedId("new");
    setErrors({});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = validateBudget(formData);
    if (!val.isValid) {
      setErrors(val.errors);
      return;
    }

    onSave({
      ...formData,
      limit: Number(formData.limit),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialBudget ? "Edit Category Budget" : "Create Category Budget"}
      maxWidth="460px"
    >
      <form onSubmit={handleSubmit} noValidate>
        {/* Category */}
        <div className="form-group">
          <label className="form-label" htmlFor="budget-cat">
            Category <span style={{ color: "var(--expense)" }}>*</span>
          </label>
          <select
            id="budget-cat"
            className="form-select"
            value={formData.category}
            onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          {errors.category && <div className="form-error-msg">{errors.category}</div>}
        </div>

        {/* Monthly Limit */}
        <div className="form-group">
          <label className="form-label" htmlFor="budget-limit">
            Monthly Spending Limit <span style={{ color: "var(--expense)" }}>*</span>
          </label>
          <input
            id="budget-limit"
            type="number"
            min="1"
            className={`form-input ${errors.limit ? "has-error" : ""}`}
            placeholder="e.g. 5000"
            value={formData.limit}
            onChange={(e) => setFormData((p) => ({ ...p, limit: e.target.value }))}
            required
          />
          {errors.limit && <div className="form-error-msg">{errors.limit}</div>}
        </div>

        {/* Target Month */}
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label className="form-label" htmlFor="budget-month">
            Target Month (YYYY-MM)
          </label>
          <input
            id="budget-month"
            type="month"
            className="form-input"
            value={formData.month}
            onChange={(e) => setFormData((p) => ({ ...p, month: e.target.value }))}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialBudget ? "Update Budget" : "Save Budget"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BudgetModal;
