import { useDispatch, useSelector } from "react-redux";
import {
  custom,
  customDecrement,
  decrement,
  increment,
  reset,
} from "../features/counterSlice";

const Counter = () => {
  const { count } = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{count}</h1>

      <br />

      <input
        type="number"
        placeholder="enter custom number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={() => dispatch(increment())}>increment</button>

      <button onClick={() => dispatch(decrement())}>decrement</button>

      <button onClick={() => dispatch(custom(number))}>custom increment</button>

      <button onClick={() => dispatch(customDecrement(number))}>
        custom decrement
      </button>

      <button onClick={() => dispatch(reset())}>reset</button>
    </>
  );
};

export default Counter;
