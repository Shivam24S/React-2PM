import { useReducer, useState } from "react";

const initialArg = {
  counter: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment": {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }

    case "decrement": {
      return {
        ...state,
        counter: state.counter - 1,
      };
    }

    case "custom": {
      return {
        ...state,
        counter: state.counter + Number(action.payload),
      };
    }

    case "reset": {
      return {
        ...state,
        counter: (state.counter = 0),
      };
    }
  }
}

const CounterUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialArg);

  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{state.counter}</h1>

      <br />

      <br />

      <button onClick={() => dispatch({ type: "increment" })}>
        increment +1
      </button>

      <br />
      <br />

      <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>

      <br />
      <br />
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={() => dispatch({ type: "custom", payload: number })}>
        custom
      </button>

      <br />
      <br />

      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </>
  );
};

export default CounterUseReducer;
