import { useState } from "react";

const ListTodo = ({ todos, handleDelete, handleEdit, handleToggle }) => {







    return (
        <>
            <table border={2}>
                <thead>
                    <tr>
                        <th>sr</th>
                        <th>status</th>
                        <th>task</th>
                        <th>Description</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((t, index) => {
                        return (
                            <tr key={t.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={t.completed}
                                        onChange={() => handleToggle(t.id)}
                                    />
                                </td>
                                <td>{t.task}</td>
                                <td>{t.description}</td>

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
        </>
    );
};

export default ListTodo;
