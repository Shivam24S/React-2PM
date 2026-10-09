import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASEURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Network error, please try again";

    return Promise.reject(new Error(message));
  }
);

export const getAllEmployee = async () => {
  const res = await api.get("/all-Employee");

  if (res.status !== 200) {
    throw new Error("failed to fetch employee data");
  }

  return res.data.employees;
};

export const addEmployee = async (empData) => {
  const res = await api.post("/add", empData);

  if (res.status !== 201) {
    throw new Error("failed to add employee data");
  }

  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await api.delete(`/${id}`);

  if (res.status !== 200) {
    throw new Error("failed to delete employee data");
  }

  return res.data;
};

export const updateEmployee = async (id, empData) => {
  const res = await api.patch(`/${id}`, empData);

  if (res.status !== 200) {
    throw new Error("failed to update employee data");
  }

  return res.data;
};

export const getEmpById = async (id) => {
  const res = await api.get(`/${id}`);

  if (res.status !== 200) {
    throw new Error("failed to fetch employee details");
  }

  return res.data.employee;
};
