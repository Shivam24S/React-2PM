import React, { useState } from "react";

const State_02 = () => {
  const [count, setCount] = useState(0);

  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };




  return (
    <>
      <h1>state_02</h1>
      <h1>{count}</h1>
      {/* <input type="text" value={input} onChange={handleChange} /> */}
      <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
      <br />
      you have typed <h1>{input}</h1>
    </>
  );
};

export default State_02;
