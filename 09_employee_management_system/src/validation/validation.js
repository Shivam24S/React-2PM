import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "minimum 2 characters required")
    .required("name is required"),
  emp_Id: yup
    .number()
    .typeError("enter a valid employee id")
    .positive("employee id must be positive")
    .required("employee id is required"),
  email: yup
    .string()
    .trim()
    .email("enter a valid email address")
    .required("email is required"),
  designation: yup.string().trim().required("designation is required"),
  department: yup.string().trim().required("department is required"),
  salary: yup
    .number()
    .typeError("enter a valid salary amount")
    .min(0, "salary cannot be negative")
    .required("salary is required"),
  status: yup.string().required("status is required"),
  mobile: yup
    .number()
    .typeError("enter a valid mobile number")
    .test(
      "len",
      "mobile number must be 10 to 15 digits",
      (v) =>
        v === undefined ||
        v === null ||
        (() => {
          const len = String(v).replace(/\D/g, "").length;
          return len >= 10 && len <= 15;
        })()
    )
    .required("mobile number is required"),
});

export default validationSchema;
