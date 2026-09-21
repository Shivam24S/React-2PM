import BootStrapNavbar from "./components/Bootstrap_05"
import External_03 from "./components/External_03"
import Inline_01 from "./components/Inline_01"
import Internal_02 from "./components/Internal_02"
import Module_04 from "./components/Module_04"
import OtherComponent from "./components/OtherComponent"
import { Button } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Inline_01 />
      <Internal_02 />
      <External_03 />
      <OtherComponent />
      <Module_04 />
      <BootStrapNavbar />
     <Button variant="secondary" >Button</Button>
    </>
  )
}

export default App