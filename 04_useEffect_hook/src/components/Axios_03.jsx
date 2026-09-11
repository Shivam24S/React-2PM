import axios from "axios";
import { useEffect, useState } from "react";

const Axios_03 = () => {
  const [user, setUser] = useState([]);

  const [error, setError] = useState(null);

  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.post("https://jsonplaceholder.typicode.com/users");


      if (res.data.length === 0) {
        setError("no user data found");
      }

      setUser(res.data);
    };

    if (fetchData === true) {
      fetchUser();
    }
  }, [fetchData]);

  return (
    <>
      <h1>user</h1>

      <button onClick={() => setFetchData(true)}>fetchUser Data</button>

      {error != null ? (
        <h1>{error}</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {user.map((u) => {
              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Axios_03;
