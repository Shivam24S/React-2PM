import { useState } from "react";

const ObjectUseState = () => {
  const [user, setUser] = useState({
    name:"",
    email: "",
    password: "",
    
  });

  const handleChange = (field, e) => {
    setUser((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  return (
    <>

 <input
        type="text"
        value={user.name}
        placeholder="name"
        onChange={(e) => handleChange("name", e)}
      />

    <br />
    <br />
      <input
        type="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => handleChange("email", e)}
      />

      <br />
      <br />

      <input
        type="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => handleChange("password", e)}
      />

      <br />
      <br />

      <h1>Name :- {user.name}</h1>

      <h1>Email :- {user.email}</h1>

      <h1>Password :- {user.password}</h1>
    </>
  );
};

export default ObjectUseState;
