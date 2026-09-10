import { useEffect, useState } from "react";

const UseEffect_Fetch_02 = () => {
  const [user, setUser] = useState([]);

  const [fetchData,setFetchData] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      const data = await res.json();

      console.log("data", data);
    };

    if(fetchData===true){
        fetchUser()
    }
   
  }, [fetchData]);

  return <>
  <h1>user</h1>
  
  <button onClick={()=>setFetchData(true)} >fetchUser Data</button>
  </>;
};

export default UseEffect_Fetch_02;
