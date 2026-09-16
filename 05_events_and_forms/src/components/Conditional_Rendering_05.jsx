import React, { useState } from "react";

const Conditional_Rendering_05 = () => {
  const [color, setColor] = useState("");

  let content;

  if (color === "red") {
    content = <h1 style={{ color: "red" }}>you have selected red color</h1>;
  } else if (color === "blue") {
    content = <h1 style={{ color: "blue" }}>you have selected blue color</h1>;
  } else if (color === "yellow") {
    content = (
      <h1 style={{ color: "yellow" }}>you have selected yellow color</h1>
    );
  } else {
    content = <h1>you have selected wrong color</h1>;
  }

  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="enter color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </form>
      {content}
    </div>
  );
};

export default Conditional_Rendering_05;
