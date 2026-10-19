import { createContext, useState } from "react";

export const expenseContext = createContext({
  expenseList: [],
  handleAdd: () => { },
  handleDelete: () => { },
  handleEdit: () => { },
  editVal: null,
  credit: 0,
  debit: 0,
  balance: 0
});



const ExpenseContext = ({ children }) => {

  const initialValues = [
    {
      id: 1,
      Title: "movie",
      Description: "spider man 2",
      Amount: 500,
      Date: "2026-10-15",
      Category: "General Expense",
      ExpenseType: "Debit",
    },
    {
      id: 2,
      Title: "cricket bet",
      Description: "Cricket",
      Amount: 1000,
      Date: "2026-10-20",
      Category: "General Expense",
      ExpenseType: "Debit",
    },
  ];

  const [expenseList, setExpenseList] = useState(initialValues);

  const [editVal, setEditVal] = useState(null);

  const handleAdd = (input) => {
    if (!input) {
      alert("all fields are required");
    } else if (editVal) {
      setExpenseList((prev) =>
        prev.map((l) => (l.id === editVal.id ? { ...l, ...input } : l)),
      );

      setEditVal(null)
    } else {
      const newExpense = {
        id: new Date().getTime(),
        ...input,
      };

      setExpenseList((p) => [...p, newExpense]);
    }
  };

  const handleDelete = (id) => {
    console.log("delete id", id);
    const deleteExpense = expenseList.filter((prev) => prev.id !== id);
    setExpenseList(deleteExpense);
  };

  const handleEdit = (id) => {
    const editExpense = expenseList.find((prev) => prev.id === id);
    setEditVal(editExpense);
  };


  const credit = expenseList.filter((t) => t.ExpenseType === "Credit").reduce((acc, curr) => {
    return acc += Number(curr.Amount)
  }, 0)



  const debit = expenseList.filter((t) => t.ExpenseType === "Debit").reduce((acc, curr) => {
    return acc += Number(curr.Amount)
  }, 0)

  const balance = credit - debit







  console.log("credit", credit)
  console.log("debit", debit)
  console.log("balance",balance)

  const value = {
    expenseList,
    handleAdd,
    handleDelete,
    handleEdit,
    editVal,
    credit,
    debit,
    balance
  };

  return (
    <expenseContext.Provider value={value}>{children}</expenseContext.Provider>
  );
};

export default ExpenseContext;
