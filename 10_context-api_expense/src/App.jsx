import { useContext } from "react"
import { expenseContext } from "./context/ExpenseContext"
import Add from "./components/Add"
import ExpenseList from "./components/ExpenseList"



const App = () => {



  const { expenseList } = useContext(expenseContext)


  console.log("expenseList", expenseList)


  return (
    <>
    <Add />
    <br /><br /><br />
    <ExpenseList/>
    </>
  )
}

export default App