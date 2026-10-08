import { Button, Table } from "react-bootstrap";

// import { getAllEmployee } from "../api/studentFetch";

import { getAllEmployee } from "../api/studentAxios";

import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
// import { deleteEmployee } from "../api/studentFetch";
import { deleteEmployee } from "../api/studentAxios";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);


  const navigate = useNavigate()

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getAllEmployee();

      setEmployee(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  } else if (error) {
    return (
      <h1 className="text-center" style={{ color: "red" }}>
        {error.message}
      </h1>
    );
  }







  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);

      await loadData();
    } catch (error) {
      console.log(error);
      throw error();
    }
  };

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
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employee.map((emp, index) => {
          return (
            <tr key={emp._id}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.emp_Id}</td>
              <td>{emp.email}</td>
              <td>{emp.designation}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>{emp.status}</td>
              <td>{emp.mobile}</td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/edit/${emp._id}`)}  >Edit</Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(emp._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Employee;
