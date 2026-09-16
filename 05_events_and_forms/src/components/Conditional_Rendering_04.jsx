import React, { useState } from "react";
import Props_03 from "./Props_03";

const Conditional_Rendering_04 = () => {
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState(false);

  const handleClick = () => {
    setLogin(!login);
    setUser(!user);
  };

  return (
    <>
      <h1>{!user ? "click to login" : "welcome user"} </h1>

      <button onClick={handleClick}>{login ? "logOut" : "login"} </button>
      <br />
      <br />

      {user &&  "welcome"}
    </>
  );
};

export default Conditional_Rendering_04;
