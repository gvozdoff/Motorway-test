import { useRef, useState } from "react";

export default function useStateRef(initial) {
  const [state, setState] = useState(initial);

  const stateRef = useRef(initial);

  function setStateLocal(newState) {
    let newVal =
      typeof newState == "function" ? newState(stateRef.current) : newState;
    stateRef.current = newVal;
    setState(newVal);
  }

  function getRefState() {
    return stateRef.current;
  }

  return [state, setStateLocal, getRefState];
}
