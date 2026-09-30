import React from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="enter your email" />

        <br />
        <br />

        <input type="password" placeholder="enter your password" />

        <br />
        <br />
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Form;
