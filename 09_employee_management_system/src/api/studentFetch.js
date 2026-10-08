const BASEURL = import.meta.env.VITE_BASE_URL;

export const getAllEmployee = async () => {
  const res = await fetch(`${BASEURL}/all-Employee`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error("failed to fetch employee data");
  }

  console.log("api data", data);

  console.log("url", `${BASEURL}/all-Employee`);

  return data.employees;
};

export const addEmployee = async (empData) => {
  try {
    const res = await fetch(`${BASEURL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "failed to add employee data");
    }

    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const res = await fetch(`${BASEURL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "failed to delete employee data");
    }

    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateEmployee = async (id, empData) => {
  try {
    const res = await fetch(`${BASEURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "failed to delete employee data");
    }

    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getEmpById = async (id) => {
  try {
    const res = await fetch(`${BASEURL}/${id}`);

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "failed to delete employee data");
    }


    

    return data.employee;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
