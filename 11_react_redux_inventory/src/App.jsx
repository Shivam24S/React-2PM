import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from './features/counterSlice'


const App = () => {


  const { count } = useSelector((state) => state.counter)

  const dispatch = useDispatch()


  return (
    <>

      <h1>{count}</h1>

      <br />

      <button onClick={() => dispatch(increment())}  >increment</button>
    </>
  )
}

export default App