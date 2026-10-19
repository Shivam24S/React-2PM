import { useContext, useState } from "react";
import { expenseContext } from "../context/ExpenseContext";

const ExpenseList = () => {
  const { expenseList, handleDelete, handleEdit } = useContext(expenseContext);

  const [expenseQuery, setExpenseQuery] = useState({
    Title: "",
    ExpenseType: "all",
    Category: "all",
    sortBy: "asc",
  });

  const handleChange = (field, e) => {
    setExpenseQuery((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("expense query", expenseQuery);
  };

  const handleReset = () => {
    setExpenseQuery({
      Title: "",
      ExpenseType: "all",
      Category: "all",
      sortBy: "asc",
    });
  };

  const filterList = expenseList
    .filter((l) =>
      l.Title.toLowerCase().includes(expenseQuery.Title.toLowerCase()),
    )
    .filter((l) =>
      expenseQuery.ExpenseType === "all"
        ? true
        : l.ExpenseType === expenseQuery.ExpenseType,
    ).filter((l) => expenseQuery.Category === "all" ? true : l.Category === expenseQuery.Category)


  console.log("filter", filterList)
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Title</label>
        <input
          type="text"
          placeholder="enter title"
          value={expenseQuery.Title}
          onChange={(e) => handleChange("Title", e)}
        />

        <label htmlFor="">Expense Type</label>

        <select
          name=""
          id=""
          value={expenseQuery.ExpenseType}
          onChange={(e) => handleChange("ExpenseType", e)}
        >
          <option value="all">select</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>

        <label htmlFor="Category">Category</label>
        <select
          name=""
          id=""
          value={expenseQuery.Category}
          onChange={(e) => handleChange("Category", e)}
        >
          <option value="all">Select</option>
          <option value="Money Transfer">Money Transfer</option>
          <option value="Cash Withdrawal">Cash Withdrawal</option>
          <option value="General Expense">General Expense</option>
          <option value="Food&Dining">Food&Dining</option>
          <option value="HealthCare">HealthCare</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
        </select>

        <label htmlFor="sortBy">sortby</label>

        <select
          value={expenseQuery.sortBy}
          onChange={(e) => handleChange("sortBy", e)}
        >
          <option value="all">Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
          <option value="moneyAsc">Money Ascending</option>
          <option value="moneyDesc">Money Descending</option>
        </select>

        <button type="submit">search</button>

        <button onClick={handleReset}>
          Clear all filter
        </button>
      </form>

      <br />
      <br />

      <table border={2}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>ExpenseType</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filterList.map((t, index) => {
            return (
              <tr key={t.id}>
                <td>{index + 1}</td>
                <td>{t.Title}</td>
                <td>{t.Description}</td>
                <td>{t.Amount}</td>
                <td>{t.Date}</td>
                <td>{t.Category}</td>
                <td>{t.ExpenseType}</td>
                <td>
                  <button onClick={() => handleEdit(t.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(t.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ExpenseList;
