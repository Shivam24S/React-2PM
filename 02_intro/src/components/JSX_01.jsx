import React from "react";

const JSX = () => {
    // without jsx
  let element = React.createElement("h1", null, "without jsx");

//   with jsx 
  element = <h1>with jsx</h1>;

  return (
    <>
      <h1>{element}</h1>
      
      
    </>
  );
};

export default JSX;
