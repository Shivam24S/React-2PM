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
import List from "./components/List";

const App = () => {
  return (
    <>
      {/* <Counter /> */}

      <Add /><br /><br />
      <List />
    </>
  );
};

export default App;
