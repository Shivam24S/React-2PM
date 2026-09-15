import { useState } from "react";

const Events_02 = () => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    alert(`hi there ${name}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your name"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <br />
        <button type="submit"> submit</button>
      </form>
    </>
  );
};

export default Events_02;
