import { useState } from "react";
import Events_02 from "./components/Events_02";
import OnClick_01 from "./components/OnClick_01";
import Props_03 from "./components/Props_03";
import Conditional_Rendering_04 from "./components/Conditional_Rendering_04";
import Conditional_Rendering_05 from "./components/Conditional_Rendering_05";

const App = () => {
  const [input, setInput] = useState("");

  const [name, setName] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setName((prev) => [...prev, input]);
  };

  return (
    <>
      {/* <OnClick_01/> */}

      {/* <Events_02 /> */}

      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>submit</button>
      </form>

      <Props_03 name={name} />
      <br />
      <Props_03 name={"alice"} />
      <br />
      <Props_03 name={"dexter"} /> */}

     {/* <Conditional_Rendering_04/> */}

    <Conditional_Rendering_05/>



    </>
  );
};

export default App;
