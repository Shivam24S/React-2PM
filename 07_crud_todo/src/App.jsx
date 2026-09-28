import { useState } from "react";
import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";

const App = () => {
  const initialTodos = [
    {
      id: 1,
      task: "learn react",
      description: "you have to learn daily react concept",
      completed: true,
    },
    {
      id: 2,
      task: "practice react code",
      description: "you have to practice daily react code",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(initialTodos);

  const [editVal, setEditVal] = useState(null);


  console.log("todos", todos)

  const handleAdd = (input) => {
    if (!input.task || !input.description) {
      alert("enter task and description data");
    } else if (editVal) {
      setTodos((t) =>
        t.map((t) =>
          t.id === editVal.id
            ? { ...t, task: input.task, description: input.description }
            : t,
        ),
      );
      setEditVal(null);
    } else {
      const newTodo = {
        id: new Date().getTime(),
        task: input.task,
        description: input.description,
        completed: false,
      };

      setTodos((prev) => [...prev, newTodo]);
    }
  };

  const handleDelete = (id) => {
    const remainItem = todos.filter((t) => t.id !== id);
    setTodos(remainItem);
  };

  const handleEdit = (id) => {
    const editValue = todos.find((t) => t.id === id);

    setEditVal(editValue);
  };

  console.log("edit val", editVal);

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <>
      <AddTodo handleAdd={handleAdd} editVal={editVal} />
      <br />
      <br />
      <ListTodo
        todos={todos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleToggle={handleToggle}
      />
    </>
  );
};

export default App;
