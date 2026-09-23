import { useState } from "react";
import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";

const App = () => {
  const initialTodos = [
    {
      id: 1,
      task: "learn react",
      description: "you have to learn daily react concept",
    },
    {
      id: 2,
      task: "practice react code",
      description: "you have to practice daily react code",
    },
  ];

  const [todos, setTodos] = useState(initialTodos);

  const handleAdd = (input) => {
    const newTodo = {
      id: new Date().getTime(),
      ...input,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  console.log("app todo", todos);

  return (
    <>
      <AddTodo handleAdd={handleAdd} />
      <br />
      <br />
      <ListTodo todos={todos} />
    </>
  );
};

export default App;
