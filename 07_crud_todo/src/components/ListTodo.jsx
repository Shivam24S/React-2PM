

const ListTodo = ({ todos }) => {
    return (
        <>

            <table border={2}>
                <thead>
                    <tr>
                        <th>
                            sr
                        </th>
                        <th>task</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((t, index) => {
                        return (
                            <tr key={t.id} >
                                <td>{index + 1}</td>
                                <td>{t.task}</td>
                                <td>{t.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ListTodo