/**
 * Robust unique ID generator with fallback.
 */
export const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Validates a transaction object before addition or update.
 * @param {object} tx
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export const validateTransaction = (tx) => {
  const errors = {};

  if (!tx.Title || !tx.Title.trim()) {
    errors.Title = "Title is required.";
  } else if (tx.Title.trim().length > 100) {
    errors.Title = "Title must be 100 characters or fewer.";
  }

  const numericAmount = Number(tx.Amount);
  if (tx.Amount === "" || tx.Amount === null || tx.Amount === undefined) {
    errors.Amount = "Amount is required.";
  } else if (isNaN(numericAmount) || numericAmount <= 0) {
    errors.Amount = "Amount must be a positive number greater than 0.";
  }

  if (!tx.Date || !tx.Date.trim()) {
    errors.Date = "Date is required.";
  } else {
    const timestamp = Date.parse(tx.Date);
    if (isNaN(timestamp)) {
      errors.Date = "Please provide a valid date.";
    }
  }

  if (!tx.Category || !tx.Category.trim()) {
    errors.Category = "Please select a category.";
  }

  if (!tx.ExpenseType || (tx.ExpenseType !== "Credit" && tx.ExpenseType !== "Debit")) {
    errors.ExpenseType = "Transaction type must be Income (Credit) or Expense (Debit).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a budget object.
 */
export const validateBudget = (budget) => {
  const errors = {};

  if (!budget.category || !budget.category.trim()) {
    errors.category = "Category is required.";
  }

  const limitNum = Number(budget.limit);
  if (budget.limit === "" || isNaN(limitNum) || limitNum <= 0) {
    errors.limit = "Limit must be a positive number.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates an imported JSON payload.
 */
export const validateImportData = (parsed) => {
  if (!parsed || typeof parsed !== "object") {
    return { isValid: false, message: "Invalid JSON backup format." };
  }

  // Support either full backup { transactions, budgets, settings } or raw array of transactions
  let transactions = [];
  let budgets = [];
  let settings = null;

  if (Array.isArray(parsed)) {
    transactions = parsed;
  } else if (parsed && typeof parsed === "object") {
    if (Array.isArray(parsed.transactions)) {
      transactions = parsed.transactions;
    }
    if (Array.isArray(parsed.budgets)) {
      budgets = parsed.budgets;
    }
    if (parsed.settings && typeof parsed.settings === "object") {
      settings = parsed.settings;
    }
  } else {
    return {
      isValid: false,
      message: "The file does not contain a recognized transaction list or backup payload.",
    };
  }

  // Validate that items in transactions have minimal structure
  const sanitizedTransactions = transactions.filter(
    (t) => t && (t.Title || t.Amount) && (t.ExpenseType === "Credit" || t.ExpenseType === "Debit"),
  );

  if (sanitizedTransactions.length === 0 && transactions.length > 0) {
    return {
      isValid: false,
      message: "No valid transaction records found in the import file.",
    };
  }

  return {
    isValid: true,
    transactions: sanitizedTransactions,
    budgets,
    settings,
  };
};
