import { useContext } from "react";
import { expenseContext } from "./expenseContext";

export const useExpense = () => {
  const context = useContext(expenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseContext provider");
  }
  return context;
};
