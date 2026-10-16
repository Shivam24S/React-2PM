import { useContext } from 'react'
import { expenseContext } from '../context/ExpenseContext'

const ExpenseStats = () => {

    const { credit, debit, balance } = useContext(expenseContext)

    return (
        <>

            <h1>credit {credit}</h1>
            <h1>debit {debit}</h1>
            <h1>balance {balance}</h1>
        </>
    )
}

export default ExpenseStats