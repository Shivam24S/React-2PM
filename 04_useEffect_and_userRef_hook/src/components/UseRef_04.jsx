import { useRef } from "react"


const UseRef_04 = () =>{


    const count = useRef(0)

       const counterValue = count.current.value

    return (
        <>
        
     
      
    <h1>{}</h1>

        <button>increase</button>
        
        </>
    )

}

export default UseRef_04