import { useEffect, useReducer, useState } from "react";
import { expenseContext } from "./expenseContext";
import {
  INITIAL_TRANSACTIONS,
  DEFAULT_BUDGETS,
  STORAGE_KEYS,
} from "../constants";
import { safeStorage } from "../utils/storage";
import { calculateTotals } from "../utils/calculations";
import { generateId } from "../utils/validation";

/**
 * Initial state initializer loading from localStorage with safe fallbacks.
 */
const init = () => {
  const savedTransactions = safeStorage.get(STORAGE_KEYS.TRANSACTIONS, null);
  const savedBudgets = safeStorage.get(STORAGE_KEYS.BUDGETS, null);
  const savedSettings = safeStorage.get(STORAGE_KEYS.SETTINGS, null);

  // If savedTransactions is an array with items, use it. Otherwise provide rich demo data.
  const expenseList =
    Array.isArray(savedTransactions) && savedTransactions.length > 0
      ? savedTransactions
      : INITIAL_TRANSACTIONS;

  const budgets =
    Array.isArray(savedBudgets) && savedBudgets.length > 0
      ? savedBudgets
      : DEFAULT_BUDGETS;

  const settings = {
    theme: savedSettings?.theme || "light",
    currency: savedSettings?.currency || "INR",
    userName: savedSettings?.userName || "Personal Account",
  };

  return {
    expenseList,
    editVal: null,
    budgets,
    settings,
  };
};

/**
 * Pure reducer function for all financial state changes.
 */
function reducer(state, action) {
  switch (action.type) {
    // Add new or update existing transaction
    case "ADD_TRANSACTION":
    case "add": {
      const payload = action.payload;
      if (!payload) return state;

      // Check if we are currently updating an existing transaction
      const targetId = state.editVal ? state.editVal.id : payload.id;
      const isExisting = state.expenseList.some((t) => t.id === targetId);

      if (isExisting) {
        // Correctly update the item while preserving its unique id
        const updatedList = state.expenseList.map((item) =>
          item.id === targetId
            ? {
                ...item,
                ...payload,
                id: targetId,
                Amount: Number(payload.Amount) || item.Amount,
              }
            : item,
        );

        return {
          ...state,
          expenseList: updatedList,
          editVal: null,
        };
      }

      // Add fresh transaction
      const newTransaction = {
        ...payload,
        id: payload.id || generateId(),
        Amount: Number(payload.Amount) || 0,
        Date: payload.Date || new Date().toISOString().slice(0, 10),
        Category: payload.Category || "General Expense",
        ExpenseType: payload.ExpenseType || "Debit",
      };

      return {
        ...state,
        expenseList: [newTransaction, ...state.expenseList],
        editVal: null,
      };
    }

    // Set transaction in edit mode
    case "UPDATE_TRANSACTION":
    case "update": {
      const targetTransaction = state.expenseList.find(
        (item) => item.id === action.payload,
      );

      return {
        ...state,
        editVal: targetTransaction || null,
      };
    }

    // Cancel edit mode
    case "CANCEL_EDIT":
    case "cancel_edit": {
      return {
        ...state,
        editVal: null,
      };
    }

    // Delete a transaction
    case "DELETE_TRANSACTION":
    case "delete": {
      const remainingList = state.expenseList.filter(
        (item) => item.id !== action.payload,
      );

      return {
        ...state,
        expenseList: remainingList,
        // If the item currently being edited is deleted, safely clear editVal
        editVal:
          state.editVal?.id === action.payload ? null : state.editVal,
      };
    }

    // Budgets management
    case "SET_BUDGETS": {
      return {
        ...state,
        budgets: action.payload || [],
      };
    }

    case "ADD_BUDGET": {
      const newBudget = {
        ...action.payload,
        id: action.payload.id || generateId(),
        limit: Number(action.payload.limit) || 0,
      };

      // If budget for this category exists for same month, replace it; otherwise prepend
      const existsIndex = state.budgets.findIndex(
        (b) =>
          b.category === newBudget.category &&
          (!b.month || b.month === newBudget.month),
      );

      let updatedBudgets;
      if (existsIndex >= 0) {
        updatedBudgets = state.budgets.map((b, idx) =>
          idx === existsIndex ? { ...b, ...newBudget } : b,
        );
      } else {
        updatedBudgets = [newBudget, ...state.budgets];
      }

      return {
        ...state,
        budgets: updatedBudgets,
      };
    }

    case "DELETE_BUDGET": {
      return {
        ...state,
        budgets: state.budgets.filter((b) => b.id !== action.payload),
      };
    }

    // Settings update
    case "UPDATE_SETTINGS": {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    }

    // Import complete or partial backup
    case "IMPORT_DATA": {
      const { transactions, budgets, settings } = action.payload;
      return {
        ...state,
        expenseList: Array.isArray(transactions)
          ? transactions
          : state.expenseList,
        budgets: Array.isArray(budgets) && budgets.length > 0 ? budgets : state.budgets,
        settings: settings ? { ...state.settings, ...settings } : state.settings,
        editVal: null,
      };
    }

    // Reset data to defaults
    case "RESET_DATA": {
      return {
        expenseList: INITIAL_TRANSACTIONS,
        editVal: null,
        budgets: DEFAULT_BUDGETS,
        settings: {
          theme: "light",
          currency: "INR",
          userName: "Personal Account",
        },
      };
    }

    default:
      return state;
  }
}

/**
 * Context Provider Component.
 */
const ExpenseContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null, init);

  // Local navigation and modal UI state
  const [activeView, setActiveView] = useState("dashboard");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast notification helper
  const addToast = (message, type = "success") => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync transactions to localStorage
  useEffect(() => {
    safeStorage.set(STORAGE_KEYS.TRANSACTIONS, state.expenseList);
  }, [state.expenseList]);

  // Sync budgets to localStorage
  useEffect(() => {
    safeStorage.set(STORAGE_KEYS.BUDGETS, state.budgets);
  }, [state.budgets]);

  // Sync settings & apply theme to DOM document
  useEffect(() => {
    safeStorage.set(STORAGE_KEYS.SETTINGS, state.settings);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute(
        "data-theme",
        state.settings.theme || "light",
      );
    }
  }, [state.settings]);

  // Handler functions mapped to reducer actions
  const handleAdd = (input) => {
    dispatch({ type: "ADD_TRANSACTION", payload: input });
    addToast(
      state.editVal
        ? "Transaction updated successfully!"
        : "New transaction recorded!",
      "success",
    );
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
    addToast("Transaction removed.", "info");
  };

  const handleEdit = (id) => {
    dispatch({ type: "UPDATE_TRANSACTION", payload: id });
    setIsAddModalOpen(true);
  };

  const handleCancelEdit = () => {
    dispatch({ type: "CANCEL_EDIT" });
  };

  const handleAddBudget = (budget) => {
    dispatch({ type: "ADD_BUDGET", payload: budget });
    addToast("Budget saved successfully!", "success");
  };

  const handleDeleteBudget = (id) => {
    dispatch({ type: "DELETE_BUDGET", payload: id });
    addToast("Budget deleted.", "info");
  };

  const handleUpdateSettings = (newSettings) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: newSettings });
    addToast("Settings updated.", "success");
  };

  const handleToggleTheme = () => {
    const nextTheme = state.settings.theme === "dark" ? "light" : "dark";
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: { theme: nextTheme },
    });
  };

  const handleImportData = (importPayload) => {
    dispatch({ type: "IMPORT_DATA", payload: importPayload });
    addToast("Data imported successfully!", "success");
  };

  const handleResetData = () => {
    dispatch({ type: "RESET_DATA" });
    addToast("Data reset to initial demo configuration.", "info");
  };

  // Derive core financial metrics reliably without stale independent states
  const { credit, debit, balance, savingsRate } = calculateTotals(
    state.expenseList,
  );

  const value = {
    expenseList: state.expenseList,
    handleAdd,
    handleDelete,
    handleEdit,
    handleCancelEdit,
    editVal: state.editVal,
    credit,
    debit,
    balance,
    savingsRate,
    budgets: state.budgets,
    handleAddBudget,
    handleDeleteBudget,
    settings: state.settings,
    handleUpdateSettings,
    handleToggleTheme,
    handleImportData,
    handleResetData,
    // UI state
    toasts,
    addToast,
    removeToast,
    activeView,
    setActiveView,
    isAddModalOpen,
    setIsAddModalOpen,
  };

  return (
    <expenseContext.Provider value={value}>{children}</expenseContext.Provider>
  );
};

export default ExpenseContext;
