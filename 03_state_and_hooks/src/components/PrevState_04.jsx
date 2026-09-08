import React, { useState } from "react";

const PrevState_04 = () => {
  const [input, setInput] = useState("");

  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsers((prev)=>[...prev,input]);

    // setUsers(()=>[input]);


  };

  console.log("users",users)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit">add user</button>
      </form>

      <ul>
        {users.map((u) => {
          return <li>{u}</li>;
        })}
      </ul>
    </>
  );
};

export default PrevState_04;
