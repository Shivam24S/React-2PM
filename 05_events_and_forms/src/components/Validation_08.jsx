import { useState } from "react";

const Validation_08 = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  const [error, setError] = useState([]);

  const validation = () => {
    const newErrors = {};

    if (input.name === "") {
      newErrors.name = "name is required";
    }

    if (input.email === "") {
      newErrors.email = "email is required";
    }

    if (!input.email.includes("@")) {
      newErrors.email = "invalid email";
    }

    if (!input.password) {
      newErrors.password = "password is required";
    }

    if (input.password.length < 6) {
      newErrors.password = "password must be atleast 6 character long";
    }

    return newErrors;
  };

  const handleChange = (field, e) => {
    setInput((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = validation();

    if (Object.keys(validate).length > 0) {
      setError(validate);
    } else {
      setUsers((prev) => [...prev, input]);
      alert("user data saved");
    }
  };

  console.log("users list", users);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your name"
          value={input.name}
          onChange={(e) => handleChange("name", e)}
        />

        {error.name ? <p style={{ color: "red" }}>{error.name}</p> : null}
        <br />
        <br />
        <input
          type="email"
          placeholder="enter your email"
          value={input.email}
          onChange={(e) => handleChange("email", e)}
        />

        {error.email ? <p style={{ color: "red" }}>{error.email}</p> : null}
        <br />
        <br />

        <input
          type="password"
          placeholder="enter your password"
          value={input.password}
          onChange={(e) => handleChange("password", e)}
        />

        {error.password ? (
          <p style={{ color: "red" }}>{error.password}</p>
        ) : null}
        <br />
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Validation_08;
