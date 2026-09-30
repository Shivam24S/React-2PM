import React from "react";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <ul style={{ display: "flex", gap: "1rem" }}>
      <NavLink to={"/"}>home</NavLink>
      <NavLink to={"/about"}>About</NavLink>
      <NavLink to={"/service"}>service</NavLink>
      <NavLink to={"/auth"}>auth</NavLink>
    </ul>
  );
};

export default Navbar;
