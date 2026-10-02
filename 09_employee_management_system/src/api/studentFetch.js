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
