import { useState } from "react";
import State_01 from "./components/State_01";
import State_02 from "./components/State_02";
import PrevState_03 from "./components/prevState_03";
import PrevState_04 from "./components/PrevState_04";

const App = () => {
  const [counter, setCounter] = useState(10);

  console.log("app");

  return (
    <>
      {/* <State_01 /> */}

      {/* <State_02/> */}

      {/* <h1>app counter {counter}</h1> */}

      {/* <PrevState_03 /> */}

      <PrevState_04/>
    </>
  );
};

export default App;
