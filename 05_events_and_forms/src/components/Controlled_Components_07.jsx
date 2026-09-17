import  { useState } from "react";

const Controlled_Components_07 = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  const handleChange = (field, e) => {
    setInput((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  console.log("input",input)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.name || !input.email || !input.password) {
      alert("all field are required");
    } else {
      setUsers((prev) => [...prev, input]);

    }
  };

  
      console.log("users list", users);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter name"
          value={input.name}
          onChange={(e) => handleChange("name", e)}
        />
        <br />
        <br />

        <input
          type="email"
          placeholder="enter email"
          value={input.email}
          onChange={(e) => handleChange("email", e)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="enter password"
          value={input.password}
          onChange={(e) => handleChange("password", e)}
        />
        <br />
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Controlled_Components_07;
