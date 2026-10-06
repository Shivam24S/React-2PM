import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "minimum 2 character is required")
    .required("name is required"),
  emp_Id: yup.number().required("emp id is required"),
  email: yup.string().email("invalid email").required("email is required"),
  designation: yup.string().required("designation is required"),
  department: yup.string().required("department is required"),
  salary: yup.number().required("salary is required"),
  status: yup.string().required("status is required"),
  mobile: yup.number().required("mobile num is required"),
});

export default validationSchema;
