import { Table } from "react-bootstrap";

import { getAllEmployee } from "../api/studentFetch";
import { useEffect, useState } from "react";

const Employee = () => {
    const [employee, setEmployee] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    useEffect(() => {

        loadData()

    }, [])



    const loadData = async () => {

        setLoading(true)

        const data = await getAllEmployee()

        setEmployee(data)

    }






    console.log("emp", employee);

    return (
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Sr.no</th>
                    <th>Name</th>
                    <th>Emp_id</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th> Status </th>
                    <th>Mobile</th>
                </tr>
            </thead>
            <tbody>
                {employee.map((emp, index) => {
                    return (
                        <tr key={emp._id}>
                            <td>{index + 1}</td>
                            <td>{emp.name}</td>
                            <td>{emp.emp_Id
                            }</td>
                            <td>{emp.email}</td>
                            <td>{emp.designation}</td>
                            <td>{emp.department}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.status}</td>
                            <td>{emp.mobile}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default Employee;
