/**
 * Safe localStorage utilities with error handling and fallback support.
 */

export const safeStorage = {
  get: (key, fallback = null) => {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return fallback;
      }
      const item = window.localStorage.getItem(key);
      if (item === null || item === undefined || item === "") {
        return fallback;
      }
      return JSON.parse(item);
    } catch (err) {
      console.warn(`[safeStorage] Error parsing key "${key}":`, err);
      return fallback;
    }
  },

  set: (key, value) => {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return false;
      }
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[safeStorage] Error writing key "${key}":`, err);
      return false;
    }
  },

  remove: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (err) {
      console.error(`[safeStorage] Error removing key "${key}":`, err);
    }
  },
};
