import { Dispatch, SetStateAction, useRef, useState } from "react";

/**
 * 
 * @param init 
 * @returns 
 */
function useAtomicState<T>(init: T){
    const [state, _setState] = useState<T>(init);
    const state_id = useRef(0);
  
    /**
     * This function setState and return a safe state setter that ensure that the state has not been modified. 
     * 
     * @param setStateAction new state or callback; usable just as when use native useEffect;
     * @returns a state function that can be called to safely update the state;
     */
    const setState: (setStateAction: SetStateAction<T>) =>  Dispatch<SetStateAction<T>>= (setStateAction) => {
      state_id.current++;

      _setState(setStateAction);

      const myStateID = state_id.current;

      const setSelectiveState : (setStateAction: SetStateAction<T>) =>  boolean  = (setStateAction) => {
          if (state_id.current !=  myStateID ) return false;

          _setState(setStateAction);
          return true;
      }

      return setSelectiveState;
    };
  
    return [state, setState, state_id] as const;
  };

  
  export default useAtomicState;