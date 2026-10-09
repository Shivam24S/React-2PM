import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, getEmpById, updateEmployee } from "../api/studentAxios";
import validationSchema from "../validation/validation";
import { useToast } from "../ui/ToastContext";
import Loading from "../ui/Loading";

const EMPTY_VALUES = {
  name: "",
  emp_Id: "",
  email: "",
  designation: "",
  department: "",
  salary: "",
  status: "",
  mobile: "",
};

const STATUS_OPTIONS = ["active", "Inactive", "On Leave", "Probation"];

const BackIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

function EmployeeForm() {
  const { Formik } = formik;

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(EMPTY_VALUES);
  const [fetching, setFetching] = useState(Boolean(id));
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchEmployeeDetail = async () => {
      try {
        setFetching(true);
        setFetchError(null);

        const emp = await getEmpById(id);
        if (cancelled) return;

        setInitialValues({
          name: emp.name ?? "",
          emp_Id: emp.emp_Id ?? "",
          email: emp.email ?? "",
          designation: emp.designation ?? "",
          department: emp.department ?? "",
          salary: emp.salary ?? "",
          status: emp.status ?? "",
          mobile: emp.mobile ?? "",
        });
      } catch (error) {
        if (!cancelled) setFetchError(error);
      } finally {
        if (!cancelled) setFetching(false);
      }
    };

    fetchEmployeeDetail();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (fetching) return <Loading />;

  if (fetchError) {
    return (
      <div className="app-card anim-fade-up" style={{ marginTop: "2rem" }}>
        <div className="state-block">
          <div className="state-icon">!</div>
          <h5>Could not load employee</h5>
          <p>{fetchError.message || "Failed to fetch employee details."}</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Back to list
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="page-header">
        <div>
          <div className="section-kicker">{id ? "Update record" : "New member"}</div>
          <h1>{id ? "Edit Employee" : "Add Employee"}</h1>
          <p className="subtitle">
            {id
              ? "Update contact details for this employee."
              : "Fill in the details to add someone new to the directory."}
          </p>
        </div>
        <Button variant="outline-secondary" onClick={() => navigate("/")}>
          <span className="d-inline-flex align-items-center gap-2">
            <BackIcon /> Back to list
          </span>
        </Button>
      </div>

      <div className="app-card anim-fade-up delay-1">
        <div className="app-card-body">
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                if (id) {
                  await updateEmployee(id, {
                    name: values.name,
                    email: values.email,
                    mobile: values.mobile,
                  });
                  showToast("Employee updated successfully", "success");
                } else {
                  await addEmployee(values);
                  showToast("Employee added successfully", "success");
                }

                resetForm();
                navigate("/");
              } catch (error) {
                showToast(error?.message || "Something went wrong", "error");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <div className="section-kicker mb-3">Identity</div>
                <Row className="g-3 mb-4">
                  <Form.Group as={Col} md="4" controlId="emp-name">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="e.g. Priya Sharma"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="emp-id">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control
                      type="number"
                      name="emp_Id"
                      placeholder="e.g. 1024"
                      disabled={Boolean(id)}
                      value={values.emp_Id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.emp_Id && !errors.emp_Id}
                      isInvalid={touched.emp_Id && !!errors.emp_Id}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.emp_Id}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="emp-email">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text>@</InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="name@company.com"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <div className="section-kicker mb-3">Role &amp; compensation</div>
                <Row className="g-3 mb-4">
                  <Form.Group as={Col} md="4" controlId="emp-designation">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Frontend Developer"
                      disabled={Boolean(id)}
                      name="designation"
                      value={values.designation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.designation && !!errors.designation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.designation}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="emp-department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Engineering"
                      disabled={Boolean(id)}
                      name="department"
                      value={values.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.department && !!errors.department}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.department}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="emp-salary">
                    <Form.Label>Salary (₹ / year)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="e.g. 600000"
                      disabled={Boolean(id)}
                      name="salary"
                      value={values.salary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.salary && !!errors.salary}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.salary}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <div className="section-kicker mb-3">Status &amp; contact</div>
                <Row className="g-3 mb-4">
                  <Form.Group as={Col} md="6" controlId="emp-status">
                    <Form.Label>Status</Form.Label>
                    {(() => {
                      const options = STATUS_OPTIONS.includes(values.status)
                        ? STATUS_OPTIONS
                        : values.status
                          ? [values.status, ...STATUS_OPTIONS]
                          : STATUS_OPTIONS;

                      return (
                        <Form.Select
                          name="status"
                          disabled={Boolean(id)}
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.status && !!errors.status}
                        >
                          <option value="">Select status</option>
                          {options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </Form.Select>
                      );
                    })()}
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="emp-mobile">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="e.g. 9876543210"
                      name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.mobile && !!errors.mobile}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mobile}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {id && (
                  <p className="text-muted mb-4" style={{ fontSize: "0.83rem" }}>
                    Name, email and mobile are editable. Other fields stay locked
                    on an existing record.
                  </p>
                )}

                <div className="d-flex flex-wrap gap-2">
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : id ? "Update Employee" : "Add Employee"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate("/")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
