import { useState } from "react";
import { useExpense } from "../context/useExpense";
import { CATEGORIES, PAYMENT_METHODS } from "../constants";
import { validateTransaction } from "../utils/validation";
import { getTodayDateString } from "../utils/formatters";

const Add = () => {
  const { handleAdd, editVal, handleCancelEdit } = useExpense();

  const [input, setInputs] = useState({
    Title: "",
    Description: "",
    Amount: "",
    Date: getTodayDateString(),
    Category: "Food&Dining",
    ExpenseType: "Debit",
    PaymentMethod: "UPI",
    Tags: "",
  });

  const [syncedId, setSyncedId] = useState(null);
  const [errors, setErrors] = useState({});

  // Synchronize when editVal changes without causing cascading useEffect renders
  if (editVal && editVal.id !== syncedId) {
    setInputs({
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
  } else if (!editVal && syncedId !== null && syncedId !== "new") {
    setInputs({
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

  const handleChange = (field, value) => {
    setInputs((prev) => ({
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
    const val = validateTransaction(input);
    if (!val.isValid) {
      setErrors(val.errors);
      return;
    }

    handleAdd({
      ...input,
      Amount: Number(input.Amount),
      id: editVal ? editVal.id : undefined,
    });

    setInputs({
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
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{editVal ? "Edit Transaction" : "Quick Add Transaction"}</h3>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="add-title">Title</label>
            <input
              id="add-title"
              type="text"
              className={`form-input ${errors.Title ? "has-error" : ""}`}
              placeholder="e.g. Groceries"
              value={input.Title}
              onChange={(e) => handleChange("Title", e.target.value)}
            />
            {errors.Title && <div className="form-error-msg">{errors.Title}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="add-amount">Amount</label>
            <input
              id="add-amount"
              type="number"
              step="any"
              min="0.01"
              className={`form-input ${errors.Amount ? "has-error" : ""}`}
              placeholder="0.00"
              value={input.Amount}
              onChange={(e) => handleChange("Amount", e.target.value)}
            />
            {errors.Amount && <div className="form-error-msg">{errors.Amount}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="add-type">Type</label>
            <select
              id="add-type"
              className="form-select"
              value={input.ExpenseType}
              onChange={(e) => handleChange("ExpenseType", e.target.value)}
            >
              <option value="Debit">Expense (Debit)</option>
              <option value="Credit">Income (Credit)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="add-cat">Category</label>
            <select
              id="add-cat"
              className="form-select"
              value={input.Category}
              onChange={(e) => handleChange("Category", e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="add-date">Date</label>
            <input
              id="add-date"
              type="date"
              className="form-input"
              value={input.Date}
              onChange={(e) => handleChange("Date", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="add-pay">Payment Method</label>
            <select
              id="add-pay"
              className="form-select"
              value={input.PaymentMethod}
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

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
          {editVal && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {editVal ? "Update Transaction" : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
