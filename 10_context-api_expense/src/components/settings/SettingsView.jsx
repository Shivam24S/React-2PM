import { useState, useRef } from "react";
import {
  Sun,
  Moon,
  Coins,
  Download,
  Upload,
  RefreshCw,
  FileSpreadsheet,
  AlertTriangle,
  User,
  Check,
} from "lucide-react";
import { useExpense } from "../../context/useExpense";
import { CURRENCIES } from "../../constants";
import { validateImportData } from "../../utils/validation";
import ConfirmDialog from "../common/ConfirmDialog";
import Modal from "../common/Modal";

const SettingsView = () => {
  const {
    settings,
    expenseList,
    budgets,
    handleUpdateSettings,
    handleToggleTheme,
    handleImportData,
    handleResetData,
    addToast,
  } = useExpense();

  const fileInputRef = useRef(null);

  // Import preview modal state
  const [importPreview, setImportPreview] = useState(null);
  // Reset confirmation state
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Editable display name state
  const [userName, setUserName] = useState(settings.userName || "Personal Account");
  const [isNameSaved, setIsNameSaved] = useState(false);

  const handleSaveUserName = (e) => {
    e.preventDefault();
    handleUpdateSettings({ userName });
    setIsNameSaved(true);
    setTimeout(() => setIsNameSaved(false), 2000);
  };

  // --------------------------------------------------------------------------
  // Export Handlers
  // --------------------------------------------------------------------------

  // Export JSON
  const handleExportJSON = () => {
    const backupData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      settings,
      budgets,
      transactions: expenseList,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `expenseflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast("JSON backup downloaded successfully!", "success");
  };

  // Export CSV
  const handleExportCSV = () => {
    if (expenseList.length === 0) {
      addToast("No transactions available to export.", "warning");
      return;
    }

    const headers = ["ID", "Title", "Amount", "Date", "Category", "ExpenseType", "PaymentMethod", "Description", "Tags"];
    const rows = expenseList.map((t) => [
      t.id,
      `"${(t.Title || "").replace(/"/g, '""')}"`,
      t.Amount,
      t.Date,
      `"${(t.Category || "").replace(/"/g, '""')}"`,
      t.ExpenseType,
      `"${(t.PaymentMethod || "").replace(/"/g, '""')}"`,
      `"${(t.Description || "").replace(/"/g, '""')}"`,
      `"${(t.Tags || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `expenseflow-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast("CSV spreadsheet exported successfully!", "success");
  };

  // --------------------------------------------------------------------------
  // Import Handlers
  // --------------------------------------------------------------------------

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const validation = validateImportData(parsed);

        if (!validation.isValid) {
          addToast(validation.message || "Invalid backup file structure.", "error");
          return;
        }

        // Show preview dialog for user confirmation
        setImportPreview(validation);
      } catch (err) {
        console.error("JSON parse error:", err);
        addToast("Failed to parse JSON file. Ensure it is a valid file.", "error");
      }
    };
    reader.readAsText(file);

    // Reset input
    e.target.value = "";
  };

  const handleConfirmImport = () => {
    if (!importPreview) return;
    handleImportData(importPreview);
    setImportPreview(null);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-main)" }}>
          Preferences & Data Settings
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Manage visual theme, currency formatting, JSON/CSV backups, and data persistence
        </p>
      </div>

      <div className="settings-grid">
        {/* Appearance & Theme Section */}
        <div className="settings-section-card">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-main)" }}>
            Appearance & Profile
          </h3>

          <div className="settings-row">
            <div>
              <div className="settings-label-title">Theme Preference</div>
              <div className="settings-label-desc">
                Toggle between Clean Light Mode and Deep Dark Mode
              </div>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleToggleTheme}
            >
              {settings.theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              <span>{settings.theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>

          <div className="settings-row">
            <div>
              <div className="settings-label-title">Default Display Currency</div>
              <div className="settings-label-desc">
                Formats amounts with appropriate currency symbol (INR ₹ by default)
              </div>
            </div>
            <select
              className="form-select"
              style={{ width: "auto" }}
              value={settings.currency || "INR"}
              onChange={(e) => handleUpdateSettings({ currency: e.target.value })}
              aria-label="Display currency"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Account Profile Name */}
          <form onSubmit={handleSaveUserName} style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="form-label" htmlFor="user-name-input">
                Account Label / Name
              </label>
              <input
                id="user-name-input"
                type="text"
                className="form-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Personal Account"
              />
            </div>
            <button type="submit" className="btn btn-secondary" style={{ height: "40px" }}>
              {isNameSaved ? <Check size={16} style={{ color: "var(--income)" }} /> : <User size={16} />}
              <span>{isNameSaved ? "Saved" : "Update"}</span>
            </button>
          </form>
        </div>

        {/* Data Backup & Export Section */}
        <div className="settings-section-card">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-main)" }}>
            Data Backup & Portability
          </h3>

          <div className="settings-row">
            <div>
              <div className="settings-label-title">Export Complete Backup (JSON)</div>
              <div className="settings-label-desc">
                Downloads all transactions, budgets and settings for local safekeeping
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleExportJSON}
            >
              <Download size={16} />
              <span>JSON</span>
            </button>
          </div>

          <div className="settings-row">
            <div>
              <div className="settings-label-title">Export Transactions (CSV)</div>
              <div className="settings-label-desc">
                Download spreadsheet-compatible table format for Excel or Google Sheets
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleExportCSV}
            >
              <FileSpreadsheet size={16} />
              <span>CSV</span>
            </button>
          </div>

          <div className="settings-row">
            <div>
              <div className="settings-label-title">Import Backup File (JSON)</div>
              <div className="settings-label-desc">
                Restore previously exported transactions and budgets
              </div>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={16} />
                <span>Import JSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset Application Data */}
      <div
        className="card"
        style={{
          borderColor: "var(--expense-border)",
          backgroundColor: "var(--bg-card)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, color: "var(--expense)" }}>
            <AlertTriangle size={18} />
            <span>Reset Demo Data / Clean Slate</span>
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Revert transactions and budgets back to initial demo seeds. Useful for testing features or clearing personal notes.
          </div>
        </div>

        <button
          type="button"
          className="btn btn-danger-outline"
          onClick={() => setIsResetConfirmOpen(true)}
        >
          <RefreshCw size={15} />
          <span>Reset to Demo Data</span>
        </button>
      </div>

      {/* Import Preview Confirmation Modal */}
      {importPreview && (
        <Modal
          isOpen={Boolean(importPreview)}
          onClose={() => setImportPreview(null)}
          title="Confirm Data Import"
          maxWidth="480px"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text-main)" }}>
              The selected backup contains:
            </p>
            <ul
              style={{
                backgroundColor: "var(--bg-subtle)",
                padding: "12px 18px",
                borderRadius: "var(--radius-md)",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <li>
                <strong>{importPreview.transactions.length}</strong> valid transactions
              </li>
              <li>
                <strong>{importPreview.budgets.length}</strong> budget allocations
              </li>
              <li>
                Settings preference:{" "}
                <strong>{importPreview.settings?.currency || "Preserve current"}</strong>
              </li>
            </ul>

            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Importing will replace your current active workspace data with the contents of this file. Do you wish to proceed?
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setImportPreview(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmImport}
              >
                Confirm & Import
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetData}
        title="Reset All Application Data"
        message="Are you sure you want to reset all stored transactions, budgets, and settings to the initial demo state? Current local changes will be replaced."
        confirmLabel="Reset Data"
        confirmVariant="danger"
      />
    </div>
  );
};

export default SettingsView;
