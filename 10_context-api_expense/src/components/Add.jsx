import { useContext, useEffect, useState } from "react";
import { expenseContext } from "../context/ExpenseContext";

const Add = () => {
  const [input, setInputs] = useState({
    Title: "",
    Description: "",
    Amount: "",
    Date: "",
    Category: "General Expense",
    ExpenseType: "Debit",
  });

  console.log("input", input);

  const { handleAdd, editVal } = useContext(expenseContext);

  useEffect(() => {

    editVal ? setInputs(editVal) : null
  }, [editVal])

  const handleChange = (field, e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAdd(input);

    setInputs({
      Title: "",
      Description: "",
      Amount: "",
      Date: "",
      Category: "General Expense",
      ExpenseType: "Debit",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          placeholder="Enter Title"
          value={input.Title}
          onChange={(e) => handleChange("Title", e)}
        />
        <br />
        <br />
        <label htmlFor="Description">Description</label>
        <input
          type="text"
          placeholder=" Enter Description"
          value={input.Description}
          onChange={(e) => handleChange("Description", e)}
        />
        <br />
        <br />
        <label htmlFor="Amount">Amount</label>
        <input
          type="number"
          placeholder="Enter Amount"
          value={input.Amount}
          onChange={(e) => handleChange("Amount", e)}
        />
        <br />
        <br />
        <label htmlFor="Date">Date</label>
        <input
          type="Date"
          placeholder="Enter Date"
          value={input.Date}
          onChange={(e) => handleChange("Date", e)}
        />
        <br />
        <br />
        <label htmlFor="Category">Category</label>
        <select
          name=""
          id=""
          value={input.Category}
          onChange={(e) => handleChange("Category", e)}
        >
          <option value="">Select</option>
          <option value="Money Transfer">Money Transfer</option>
          <option value="Cash Withdrawal">Cash Withdrawal</option>
          <option value="General Expense">General Expense</option>
          <option value="Food&Dining">Food&Dining</option>
          <option value="HealthCare">HealthCare</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
        </select>
        <br />
        <br />
        <label htmlFor="Type">Type</label>
        <select
          name=""
          id=""
          value={input.ExpenseType}
          onChange={(e) => handleChange("ExpenseType", e)}
        >
          <option value="">select</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        <br /><br />
        <button type="submit">{editVal ? "update" : "add"}</button>
      </form>
    </>
  );
};

export default Add;
