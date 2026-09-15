import  { useRef } from "react";

const UseRef_06 = () => {
  const name = useRef("");


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("name",name.current.value)
    
  };

  console.log("it will not rendered again");

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="enter your name" ref={name} />

        <button type="submit">add</button>
      </form>

      <br />
      <br />

    </>
  );
};

export default UseRef_06;
