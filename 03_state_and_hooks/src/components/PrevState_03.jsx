import React, { useState } from "react";

const PrevState_03 = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // setCount(count + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <h1>Count {count}</h1>

      <button onClick={handleClick}>+1</button>

      <br />

      <br />

      <br />

      <button
        onClick={() => {
          handleClick();
          handleClick();
          handleClick();
          handleClick();
          handleClick();
        }}
      >
        +5
      </button>
    </>
  );
};

export default PrevState_03;
