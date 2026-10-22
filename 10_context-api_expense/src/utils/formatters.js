import { CURRENCIES } from "../constants";

/**
 * Format a numeric amount into a currency string.
 * @param {number|string} amount
 * @param {string} currencyCode - e.g. 'INR', 'USD'
 * @param {boolean} showFraction - whether to show decimal cents
 * @returns {string}
 */
export const formatCurrency = (amount, currencyCode = "INR", showFraction = false) => {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) return "₹0";

  const curr = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];

  try {
    const locale = currencyCode === "INR" ? "en-IN" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: showFraction ? 2 : 0,
      maximumFractionDigits: showFraction ? 2 : 0,
    }).format(numericAmount);
  } catch {
    return `${curr.symbol}${numericAmount.toLocaleString()}`;
  }
};

/**
 * Format a date string (YYYY-MM-DD) into a human readable date.
 * @param {string} dateStr
 * @param {boolean} short
 * @returns {string}
 */
export const formatDate = (dateStr, short = false) => {
  if (!dateStr) return "N/A";
  try {
    // Treat as UTC or local date without timezone skew
    const [year, month, day] = dateStr.split("-").map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);

    if (short) {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

/**
 * Format a number as percentage string.
 * @param {number} rate
 * @returns {string}
 */
export const formatPercent = (rate) => {
  if (isNaN(rate) || !isFinite(rate)) return "0.0%";
  return `${rate.toFixed(1)}%`;
};

/**
 * Get current date in YYYY-MM-DD format for form defaults.
 */
export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
