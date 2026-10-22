import { CATEGORIES } from "../constants";

/**
 * Calculates core financial totals safely from an array of transactions.
 * Total Income = sum of Credit transactions
 * Total Expenses = sum of Debit transactions
 * Total Balance = Total Income - Total Expenses
 * Savings Rate = ((Total Income - Total Expenses) / Total Income) * 100
 */
export const calculateTotals = (transactions = []) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return {
      credit: 0,
      debit: 0,
      balance: 0,
      savingsRate: 0,
    };
  }

  let credit = 0;
  let debit = 0;

  for (const t of transactions) {
    const amount = Number(t.Amount);
    if (!isNaN(amount) && amount > 0) {
      if (t.ExpenseType === "Credit") {
        credit += amount;
      } else if (t.ExpenseType === "Debit") {
        debit += amount;
      }
    }
  }

  const balance = credit - debit;
  // Handle zero income safely. Never return NaN or Infinity.
  const savingsRate = credit > 0 ? Math.max(0, ((credit - debit) / credit) * 100) : 0;

  return {
    credit,
    debit,
    balance,
    savingsRate: isFinite(savingsRate) ? savingsRate : 0,
  };
};

/**
 * Groups transactions by month for cashflow visualization over time.
 * Returns sorted array of { key, label, income, expense, net }
 */
export const aggregateCashFlowByMonth = (transactions = []) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return [];
  }

  const map = {};

  for (const t of transactions) {
    if (!t.Date) continue;
    const monthKey = t.Date.slice(0, 7); // YYYY-MM
    if (!map[monthKey]) {
      const [year, month] = monthKey.split("-").map(Number);
      const date = new Date(year, month - 1, 1);
      const label = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      map[monthKey] = {
        key: monthKey,
        label,
        income: 0,
        expense: 0,
        net: 0,
      };
    }

    const amount = Number(t.Amount) || 0;
    if (t.ExpenseType === "Credit") {
      map[monthKey].income += amount;
    } else if (t.ExpenseType === "Debit") {
      map[monthKey].expense += amount;
    }
    map[monthKey].net = map[monthKey].income - map[monthKey].expense;
  }

  return Object.values(map).sort((a, b) => a.key.localeCompare(b.key));
};

/**
 * Aggregates Debit transactions by Category for donut / breakdown charts.
 */
export const aggregateCategorySpending = (transactions = []) => {
  const debitTransactions = (transactions || []).filter(
    (t) => t.ExpenseType === "Debit" && Number(t.Amount) > 0,
  );

  const totalDebit = debitTransactions.reduce((acc, t) => acc + (Number(t.Amount) || 0), 0);

  if (totalDebit === 0) {
    return {
      total: 0,
      categories: [],
    };
  }

  const groupMap = {};

  for (const t of debitTransactions) {
    const catId = t.Category || "General Expense";
    groupMap[catId] = (groupMap[catId] || 0) + (Number(t.Amount) || 0);
  }

  const categories = Object.entries(groupMap)
    .map(([catId, amount]) => {
      const def = CATEGORIES.find((c) => c.id === catId);
      const label = def ? def.label : catId;
      const color = def ? def.color : "#94a3b8";
      const percentage = totalDebit > 0 ? (amount / totalDebit) * 100 : 0;

      return {
        id: catId,
        label,
        color,
        amount,
        percentage,
      };
    })
    .sort((a, b) => b.amount - a.amount);

  return {
    total: totalDebit,
    categories,
  };
};

/**
 * Derives deterministic, data-driven spending insights.
 */
export const calculateSpendingInsights = (transactions = []) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return {
      topCategory: null,
      largestExpense: null,
      avgExpense: 0,
      currentMonthSummary: { income: 0, expense: 0, count: 0 },
    };
  }

  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  let currentMonthIncome = 0;
  let currentMonthExpense = 0;
  let currentMonthCount = 0;

  let largestExpense = null;
  const debits = [];

  for (const t of transactions) {
    const amt = Number(t.Amount) || 0;
    const isCurrentMonth = t.Date && t.Date.startsWith(currentMonthKey);

    if (isCurrentMonth) {
      currentMonthCount++;
      if (t.ExpenseType === "Credit") currentMonthIncome += amt;
      if (t.ExpenseType === "Debit") currentMonthExpense += amt;
    }

    if (t.ExpenseType === "Debit") {
      debits.push(t);
      if (!largestExpense || amt > Number(largestExpense.Amount)) {
        largestExpense = t;
      }
    }
  }

  const catBreakdown = aggregateCategorySpending(transactions);
  const topCategory = catBreakdown.categories.length > 0 ? catBreakdown.categories[0] : null;

  const totalExpense = debits.reduce((sum, d) => sum + (Number(d.Amount) || 0), 0);
  const avgExpense = debits.length > 0 ? totalExpense / debits.length : 0;

  return {
    topCategory,
    largestExpense,
    avgExpense,
    currentMonthSummary: {
      key: currentMonthKey,
      income: currentMonthIncome,
      expense: currentMonthExpense,
      count: currentMonthCount,
    },
  };
};

/**
 * Calculates budget utilization against actual debit transactions.
 */
export const calculateBudgetUsage = (budgets = [], transactions = [], targetMonth = null) => {
  const monthKey =
    targetMonth ||
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  // Filter debits for the target month
  const monthlyDebits = (transactions || []).filter(
    (t) =>
      t.ExpenseType === "Debit" &&
      t.Date &&
      t.Date.startsWith(monthKey) &&
      Number(t.Amount) > 0,
  );

  let totalBudgetLimit = 0;
  let totalBudgetSpent = 0;

  const items = (budgets || []).map((b) => {
    const limit = Number(b.limit) || 0;
    totalBudgetLimit += limit;

    // Sum matching debits for this budget category
    const spent = monthlyDebits
      .filter((t) => (t.Category || "General Expense") === b.category)
      .reduce((acc, t) => acc + (Number(t.Amount) || 0), 0);

    totalBudgetSpent += spent;

    const remaining = Math.max(0, limit - spent);
    const percentage = limit > 0 ? (spent / limit) * 100 : 0;
    const isOver = spent > limit;
    const isWarning = spent >= limit * 0.8 && !isOver;

    const catDef = CATEGORIES.find((c) => c.id === b.category);

    return {
      ...b,
      categoryLabel: catDef ? catDef.label : b.category,
      categoryColor: catDef ? catDef.color : "#64748b",
      spent,
      remaining,
      percentage,
      isOver,
      isWarning,
    };
  });

  const totalRemaining = Math.max(0, totalBudgetLimit - totalBudgetSpent);
  const totalPercentage = totalBudgetLimit > 0 ? (totalBudgetSpent / totalBudgetLimit) * 100 : 0;

  return {
    monthKey,
    totalBudgetLimit,
    totalBudgetSpent,
    totalRemaining,
    totalPercentage,
    isTotalOver: totalBudgetSpent > totalBudgetLimit,
    items,
  };
};
