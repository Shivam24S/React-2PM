import { useRef } from "react";

const Uncontrolled_Components_06 = () => {
  const inputRef = useRef("");
  

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("input", inputRef.current.value);


  };


 
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="enter some text" ref={inputRef} />

        <br />
        <br />

        <button type="submit">add</button>
      </form>
    </>
  );
};

export default Uncontrolled_Components_06;
