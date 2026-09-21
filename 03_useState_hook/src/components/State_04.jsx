import { useState } from "react";

const State_04 = () => {
  
    const [name,setName] = useState("")
  
    const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleName = (e)=>{
    setName(e.target.value)
  } 


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <input type="text" value={name} onChange={handleName} />

      <br />
      <br />
      <input type="email" value={email} onChange={handleEmail} />
      <br />
      <br />
      <input type="password" value={password} onChange={handlePassword} />
      <br />
      <br />
      <h1>Email:- {email}</h1>
      <br />
      <br />
      <h1>Password:- {password}</h1>
    </>
  );
};

export default State_04;
