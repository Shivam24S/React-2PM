import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  custom,
  customDecrement,
  decrement,
  increment,
  reset,
} from "./features/counterSlice";
import Add from "./components/Add";
import Counter from "./components/Counter";

const App = () => {
  return (
    <>
      {/* <Counter /> */}

      <Add />
    </>
  );
};

export default App;
