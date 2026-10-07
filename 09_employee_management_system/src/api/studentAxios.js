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
    const res = await axios.post(`${BASEURL}/add`,  empData );

    if (res.status !== 201) {
      throw new Error("failed to add employee data");
    }

    return res.data.employees;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
