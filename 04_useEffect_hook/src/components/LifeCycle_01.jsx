// react component lifecycle method

import { useEffect, useState } from "react";

// mounting

// updating

// unmounting

// useEffect

const LifeCycle_01 = () => {
  const [count, setCount] = useState(0);

  const [name, setName] = useState("");

  const handleCount = () => {
    setCount((c) => c + 1);
  };

  // syntax
  // useEffect(()=>{},[])

  //  mounting

  // useEffect(()=>{

  //     console.log("mounting")
  // })

  // updating

  // empty dependency

  //   useEffect(() => {
  //     console.log("updating");
  //   }, []);

  //   // now with dependency

  //   useEffect(() => {
  //     console.log("updating");
  //   },[count]);

//   unmounting 
  //   cleanup function

//   useEffect(() => {
//     console.log("unmounting");

//     return () => {
//       console.log("clean up function called");
//     };
//   }, [count]);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={handleCount}> increase</button>

      <br />
      <br />

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <h1>you have typed:- {name}</h1>
    </>
  );
};

export default LifeCycle_01;
