import { useState } from "react";
import AddTodo from "./components/AddTodo";

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


  

  return (
    <>
      <AddTodo />
    </>
  );
};

export default App;
