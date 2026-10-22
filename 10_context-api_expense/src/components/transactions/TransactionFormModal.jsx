import { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useExpense } from "../../context/useExpense";
import { CATEGORIES, PAYMENT_METHODS } from "../../constants";
import { validateTransaction } from "../../utils/validation";
import { getTodayDateString } from "../../utils/formatters";
import Modal from "../common/Modal";

const TransactionFormModal = () => {
  const {
    isAddModalOpen,
    setIsAddModalOpen,
    editVal,
    handleAdd,
    handleCancelEdit,
  } = useExpense();

  // Initial state derived either from editVal (when editing) or default values
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Amount: "",
    Date: getTodayDateString(),
    Category: "Food&Dining",
    ExpenseType: "Debit",
    PaymentMethod: "UPI",
    Tags: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize when modal opens with editVal or resets
  // Using a tracking state for editVal ID to avoid unnecessary re-renders
  const [syncedId, setSyncedId] = useState(null);

  if (isAddModalOpen && editVal && editVal.id !== syncedId) {
    setFormData({
      Title: editVal.Title || "",
      Description: editVal.Description || "",
      Amount: String(editVal.Amount || ""),
      Date: editVal.Date || getTodayDateString(),
      Category: editVal.Category || "Food&Dining",
      ExpenseType: editVal.ExpenseType || "Debit",
      PaymentMethod: editVal.PaymentMethod || "UPI",
      Tags: editVal.Tags || "",
    });
    setSyncedId(editVal.id);
    setErrors({});
  } else if (isAddModalOpen && !editVal && syncedId !== "new") {
    setFormData({
      Title: "",
      Description: "",
      Amount: "",
      Date: getTodayDateString(),
      Category: "Food&Dining",
      ExpenseType: "Debit",
      PaymentMethod: "UPI",
      Tags: "",
    });
    setSyncedId("new");
    setErrors({});
  }

  const handleClose = () => {
    setIsAddModalOpen(false);
    handleCancelEdit();
    setSyncedId(null);
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validateTransaction(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      handleAdd({
        ...formData,
        Amount: Number(formData.Amount),
        id: editVal ? editVal.id : undefined,
      });
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAddModalOpen) return null;

  const isCredit = formData.ExpenseType === "Credit";

  return (
    <Modal
      isOpen={isAddModalOpen}
      onClose={handleClose}
      title={editVal ? "Edit Transaction" : "Record New Transaction"}
      maxWidth="540px"
    >
      <form onSubmit={handleSubmit} noValidate>
        {/* Transaction Type Segmented Toggle */}
        <div style={{ marginBottom: "18px" }}>
          <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
            Transaction Type
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              background: "var(--bg-subtle)",
              padding: "4px",
              borderRadius: "var(--radius-md)",
            }}
          >
            <button
              type="button"
              onClick={() => handleChange("ExpenseType", "Debit")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "0.85rem",
                transition: "all var(--transition-fast)",
                backgroundColor: !isCredit ? "var(--bg-card)" : "transparent",
                color: !isCredit ? "var(--expense)" : "var(--text-muted)",
                boxShadow: !isCredit ? "var(--shadow-xs)" : "none",
                border: !isCredit ? "1px solid var(--border-color)" : "1px solid transparent",
              }}
            >
              <ArrowDownRight size={16} />
              <span>Expense (Debit)</span>
            </button>

            <button
              type="button"
              onClick={() => handleChange("ExpenseType", "Credit")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "0.85rem",
                transition: "all var(--transition-fast)",
                backgroundColor: isCredit ? "var(--bg-card)" : "transparent",
                color: isCredit ? "var(--income)" : "var(--text-muted)",
                boxShadow: isCredit ? "var(--shadow-xs)" : "none",
                border: isCredit ? "1px solid var(--border-color)" : "1px solid transparent",
              }}
            >
              <ArrowUpRight size={16} />
              <span>Income (Credit)</span>
            </button>
          </div>
        </div>

        {/* Title Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="tx-title">
            Title / Payee <span style={{ color: "var(--expense)" }}>*</span>
          </label>
          <input
            id="tx-title"
            type="text"
            className={`form-input ${errors.Title ? "has-error" : ""}`}
            placeholder="e.g. Grocery Mart, Monthly Salary, Rent"
            value={formData.Title}
            onChange={(e) => handleChange("Title", e.target.value)}
            required
          />
          {errors.Title && <div className="form-error-msg">{errors.Title}</div>}
        </div>

        {/* Amount & Date Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="tx-amount">
              Amount <span style={{ color: "var(--expense)" }}>*</span>
            </label>
            <input
              id="tx-amount"
              type="number"
              step="any"
              min="0.01"
              className={`form-input ${errors.Amount ? "has-error" : ""}`}
              placeholder="0.00"
              value={formData.Amount}
              onChange={(e) => handleChange("Amount", e.target.value)}
              required
            />
            {errors.Amount && <div className="form-error-msg">{errors.Amount}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="tx-date">
              Date <span style={{ color: "var(--expense)" }}>*</span>
            </label>
            <input
              id="tx-date"
              type="date"
              className={`form-input ${errors.Date ? "has-error" : ""}`}
              value={formData.Date}
              onChange={(e) => handleChange("Date", e.target.value)}
              required
            />
            {errors.Date && <div className="form-error-msg">{errors.Date}</div>}
          </div>
        </div>

        {/* Category & Payment Method Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="tx-category">
              Category <span style={{ color: "var(--expense)" }}>*</span>
            </label>
            <select
              id="tx-category"
              className={`form-select ${errors.Category ? "has-error" : ""}`}
              value={formData.Category}
              onChange={(e) => handleChange("Category", e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.Category && <div className="form-error-msg">{errors.Category}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="tx-payment">
              Payment Method
            </label>
            <select
              id="tx-payment"
              className="form-select"
              value={formData.PaymentMethod}
              onChange={(e) => handleChange("PaymentMethod", e.target.value)}
            >
              {PAYMENT_METHODS.map((pm) => (
                <option key={pm.id} value={pm.id}>
                  {pm.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="tx-desc">
            Description / Notes (Optional)
          </label>
          <input
            id="tx-desc"
            type="text"
            className="form-input"
            placeholder="Add details, receipt notes, or context"
            value={formData.Description}
            onChange={(e) => handleChange("Description", e.target.value)}
          />
        </div>

        {/* Tags Field */}
        <div className="form-group" style={{ marginBottom: "22px" }}>
          <label className="form-label" htmlFor="tx-tags">
            Tags (Optional, comma-separated)
          </label>
          <input
            id="tx-tags"
            type="text"
            className="form-input"
            placeholder="e.g. Vacation, Office, Dinner"
            value={formData.Tags}
            onChange={(e) => handleChange("Tags", e.target.value)}
          />
        </div>

        {/* Form Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {editVal ? "Update Transaction" : "Save Transaction"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionFormModal;
