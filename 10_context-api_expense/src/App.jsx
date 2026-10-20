import { useContext } from "react"
import { expenseContext } from "./context/ExpenseContext"
import Add from "./components/Add"
import ExpenseList from "./components/ExpenseList"
import ExpenseStats from "./components/ExpenseStats"
import CounterUseReducer from "./concept/CounterUseReducer"



const App = () => {



  const { expenseList } = useContext(expenseContext)


  console.log("expenseList", expenseList)


  return (
    <>
      {/* <Add />
    <br /><br /><br />
    <ExpenseStats/>
    <br /><br />
    <ExpenseList/> */}


      <CounterUseReducer />

    </>
  )
}

export default App