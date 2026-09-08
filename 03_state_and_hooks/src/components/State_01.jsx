import { useState } from "react";

const State_01 = () => {

   const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };

 

  console.log("this will print");

  return (
    <>
      <h1>{counter}</h1>
      

      {/* <button onClick={()=>setCounter(counter+1)} >increase</button> */}

      <button onClick={handleClick}>increase</button>

      {/* <button onClick={(e)=>handleClick(e)} >increase</button> */}

      {/* this is not allowed */}

      {/* <button onClick={handleClick()}>increase</button> */}
    </>
  );
};

export default State_01;
