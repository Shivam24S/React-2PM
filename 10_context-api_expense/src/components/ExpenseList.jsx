import { useContext } from "react";
import { expenseContext } from "../context/ExpenseContext";

const ExpenseList = () => {
  const { expenseList, handleDelete, handleEdit } = useContext(expenseContext);

  return (
    <table border={2}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
          <th>ExpenseType</th>
          <th colSpan={2}>Action</th>
        </tr>
      </thead>

      <tbody>
        {expenseList.map((t, index) => {
          return (
            <tr key={t.id}>
              <td>{index + 1}</td>
              <td>{t.Title}</td>
              <td>{t.Description}</td>
              <td>{t.Amount}</td>
              <td>{t.Date}</td>
              <td>{t.Category}</td>
              <td>{t.ExpenseType}</td>
              <td>
                <button onClick={() => handleEdit(t.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ExpenseList;
