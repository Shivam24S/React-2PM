import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";

// import { addEmployee } from "../api/studentFetch";
import { addEmployee, getEmpById } from "../api/studentAxios";

import validationSchema from "../validation/validation";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EmployeeForm() {
  const { Formik } = formik;

  const navigate = useNavigate();

  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: "",
    emp_Id: 0,
    email: "",
    designation: "",
    department: "",
    salary: "",
    status: "",
    mobile: "",
  });


  console.log("intial values", initialValues)

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      try {
        const emp = await getEmpById(id);


        console.log("efferct emp", emp)

        setInitialValues({
          name: emp.name,
          emp_Id: emp.emp_Id,
          email: emp.email,
          designation: emp.designation,
          department: emp.department,
          salary: emp.salary,
          status: emp.status,
          mobile: emp.mobile,
        })

      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployeeDetail();
  }, [id]);

  return (
    <Formik
      className="mt-5"
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const result = addEmployee(values);

        resetForm();

        if (result) {
          navigate("/");
        }
      }}
      initialValues={initialValues}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="mt-5">
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={initialValues.name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Employee Id</Form.Label>
              <Form.Control
                type="number"
                name="emp_Id"
                value={initialValues.emp_Id}
                onChange={handleChange}
                isValid={touched.emp_Id && !errors.emp_Id}
              />

              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="enter email"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={initialValues.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                placeholder="designation"
                name="designation"
                value={initialValues.designation}
                onChange={handleChange}
                isInvalid={!!errors.designation}
              />

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.designation}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationFormik104"
              className="position-relative"
            >
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="department"
                name="department"
                value={initialValues.department}
                onChange={handleChange}
                isInvalid={!!errors.department}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.department}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationFormik105"
              className="position-relative"
            >
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                placeholder="Salary"
                name="salary"
                value={initialValues.salary}
                onChange={handleChange}
                isInvalid={!!errors.salary}
              />

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.salary}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              required
              name="status"
              value={initialValues.status}
              onChange={handleChange}
              isInvalid={!!errors.status}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.status}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="position-relative mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="number"
              required
              name="mobile"
              value={initialValues.mobile}
              onChange={handleChange}
              isInvalid={!!errors.mobile}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.mobile}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default EmployeeForm;
