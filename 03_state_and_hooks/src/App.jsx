import { useState } from "react";
import State_01 from "./components/State_01";

const App = () => {
  const [counter, setCounter] = useState(10);

  console.log("app");

  return (
    <>
      <State_01 />

      <h1>app counter {counter}</h1>
    </>
  );
};

export default App;
