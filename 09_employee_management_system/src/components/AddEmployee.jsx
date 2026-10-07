import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";

// import { addEmployee } from "../api/studentFetch";
import { addEmployee } from "../api/studentAxios"

import validationSchema from "../validation/validation";
import { useNavigate } from "react-router-dom";

function FormExample() {
  const { Formik } = formik;

  const navigate = useNavigate();

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
      initialValues={{
        name: "",
        emp_Id: 0,
        email: "",
        designation: "",
        department: "",
        salary: "",
        status: "",
        mobile: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
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
                value={values.name}
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
                value={values.emp_Id}
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
                  value={values.email}
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
                value={values.designation}
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
                value={values.department}
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
                value={values.salary}
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

export default FormExample;
