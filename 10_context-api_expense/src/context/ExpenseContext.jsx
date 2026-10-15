import { createContext, useState } from "react";

export const expenseContext = createContext({
  expenseList: [],
  handleAdd: () => { },
  handleDelete: () => { },
  handleEdit: () => { },
  editVal: null
});

const ExpenseContext = ({ children }) => {
  const initialValues = [
    {
      id: 1,
      Title: "movie",
      Description: "spider man 2",
      Amount: 500,
      Date: "2026-10-15",
      Category: "general expense",
      ExpenseType: "Debit",
    },
    {
      id: 2,
      Title: "cricket bet",
      Description: "Cricket",
      Amount: 1000,
      Date: "2026-10-20",
      Category: "general expense",
      ExpenseType: "Debit",
    },

  ];

  const [expenseList, setExpenseList] = useState(initialValues);

  const [editVal, setEditVal] = useState(null);

  const handleAdd = (input) => {

    console.log("incomming input", input)
    const newExpense = {
      id: new Date().getTime(),
      ...input,
    };



    setExpenseList((p) => [...p, newExpense]);
  };

  const handleDelete = (id) => {
    console.log("delete id", id);
    const deleteExpense = expenseList.filter((prev) => (prev.id !== id));
    setExpenseList(deleteExpense);

  }



  const handleEdit = (id) => {
    const editExpense = expenseList.find((prev) => prev.id === id);
    setEditVal(editExpense);
  }

  console.log("expenseList", expenseList);

  const value = {
    expenseList,
    handleAdd,
    handleDelete,
    handleEdit,
    editVal
  };

  return (
    <expenseContext.Provider value={value}>{children}</expenseContext.Provider>
  );
};

export default ExpenseContext;
