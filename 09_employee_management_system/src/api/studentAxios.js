import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

export const getAllEmployee = async () => {
  try {
    const res = await axios(`${BASEURL}/all-Employee`);

    console.log("res", res);

    if (res.status !== 200) {
      throw new Error("failed to fetch employee data");
    }

    return res.data.employees;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addEmployee = async (empData) => {
  try {
    const res = await axios.post(`${BASEURL}/add`, empData);

    if (res.status !== 201) {
      throw new Error("failed to add employee data");
    }

    return res.data.employees;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const res = await axios.delete(`${BASEURL}/${id}`);

    if (res.status !== 200) {
      throw new Error("failed to delete employee data");
    }

    return res.data.employees;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateEmployee = async (id, empData) => {
  try {
    const res = await axios.patch(`${BASEURL}/${id}`, empData);

    if (res.status !== 200) {
      throw new Error("failed to delete employee data");
    }

    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getEmpById = async (id) => {
  try {
    const res = await axios(`${BASEURL}/${id}`);

    if (res.status !== 200) {
      throw new Error("failed to delete employee data");
    }

    console.log("emp update response", res.data.employee);

    return res.data.employee;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
