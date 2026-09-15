import { useRef } from "react";

const UserRef_Dom_05 = () => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input type="text" placeholder="enter your name" ref={inputRef} />

      <button onClick={handleClick}>click</button>
    </>
  );
};

export default UserRef_Dom_05;
