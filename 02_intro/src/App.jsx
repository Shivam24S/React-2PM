// const App = () =>{

//     return (
//         <h1>hello</h1>
//     )
// }

// export default App

import React from "react";
import Fragments from "./components/Fragments_02";
import JSX from "./components/JSX_01";
import Functional from "./components/Functional_03";
import ClassComponent from "./components/ClassComponent_04";

function App() {
  return (
    <>
      <JSX />
      <Fragments />
      <Functional/>
      <ClassComponent/>
    </>
  );
}

export default App;
