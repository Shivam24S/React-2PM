import { useEffect, useState } from "react";

const AddTodo = ({ handleAdd, editVal }) => {
  const [input, setInput] = useState({
    task: "",
    description: "",
  });


  useEffect(() => {

    editVal ? setInput(editVal) : null

  }, [editVal])

  const handleChange = (field, e) => {
    setInput((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAdd(input);

    setInput({ task: "", description: "" });
  };

  console.log("task", input.task);
  console.log("description", input.description);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter task"
          value={input.task}
          onChange={(e) => handleChange("task", e)}
          required
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="enter description"
          value={input.description}
          onChange={(e) => handleChange("description", e)}
          required
        />
        <br />
        <br />
        <button type="submit">{editVal ? "update" : "add"}</button>
      </form>
    </>
  );
};

export default AddTodo;
