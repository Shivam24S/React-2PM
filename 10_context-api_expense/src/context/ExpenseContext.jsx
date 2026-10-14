import { createContext, useState } from "react";

export const expenseContext = createContext({
    expenseList: [],

});

const ExpenseContext = ({ children }) => {


    const initialValues = [{
        amount: 1000,
        type: "debit",
        category: "food"
    }, {
        amount: 5000,
        type: "debit",
        category: "sports"
    }]

    const [expenseList, setExpenseList] = useState(initialValues)



    const value = {
        expenseList
    };

    return (
        <expenseContext.Provider value={value}>{children}</expenseContext.Provider>
    );
};

export default ExpenseContext;
