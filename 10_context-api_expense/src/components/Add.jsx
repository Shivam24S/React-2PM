import { useState } from "react";

const Add = () => {
  const [input, setInputs] = useState({
    Title: "",
    Description: "",
    Amount: "",
    Date: "",
    Category: "",
    Type: "",
  });

  console.log("input", input);

  const handleChange = (e, field) => {
    setInputs((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onClick={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={input.Title}
          onChange={(e) => handleChange("Title", e)}
        />
        <br />
        <input
          type="text"
          placeholder=" Enter Description"
          value={input.Description}
          onChange={(e) => handleChange("Description", e)}
        />
        <br />
        <input
          type="number"
          placeholder="Enter Amount"
          value={input.Amount}
          onChange={(e) => handleChange("Amount", e)}
        />
        <br />
        <input
          type="Date"
          placeholder="Enter Date"
          value={input.Date}
          onChange={(e) => handleChange("Date", e)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Category"
          value={input.Category}
          onChange={(e) => handleChange("Category", e)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Type"
          value={input.Type}
          onChange={(e) => handleChange("Type", e)}
        />

        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default Add;
