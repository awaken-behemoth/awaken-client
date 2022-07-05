"strict";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import useFirstTimeLoading from "./useFirstTimeLoading";

type lifeCycleCallback = (ctx: { pageId: any; nextPageId: any }) => void;

interface lifeCycle {
  beforeSwap: lifeCycleCallback[];
  afterSwap: lifeCycleCallback[];
  onEnter: lifeCycleCallback[];
  onExit: lifeCycleCallback[];
}

/**
 * Create a desynchronized react component to help with page transition.
 *
 * @param children children needing to be delayed;
 */

// type waitList = Set<string>
export const usePageTransition = (children: React.ReactNode & {type: {prototype:string}} ) => {
  const router = useRouter();

  const [activePage, setActivePage] = React.useState(children);

  // waitList is a set of all id with whose waiFor( id ) was called.
  const waitListRef = React.useRef(new Set() as Set<string>);
  const firstTimeLoading = useFirstTimeLoading();
  const pathRef = useRef(router.asPath);

  const lifeCyclesRef = React.useRef<lifeCycle>({
    beforeSwap: [],
    afterSwap: [],
    onEnter: [],
    onExit: [],
  });

  const [pageState, setPageState] = React.useState<"enter" | "exit">("enter");

  const tryChange = (newPageState: "enter" | "exit") =>{
    setPageState(newPageState);
  }


  const executeLifeCycleCallBack = (lifeCycle: keyof lifeCycle) => {
    for (const callback of lifeCyclesRef.current[lifeCycle]) {
      callback({ pageId: activePage, nextPageId: children });
    }
  };

  const syncActivePage = () => {
    if (children === activePage) return;

    executeLifeCycleCallBack("beforeSwap");

    pathRef.current = router.asPath;
    setActivePage(children);
    setPageState("enter");

    executeLifeCycleCallBack("afterSwap");

    waitListRef.current = new Set();
  };

  const waitFor = (id: string) => {
    waitListRef.current.add(id);
  };

  const removeHold = (id: string) => {
    waitListRef.current.delete(id);
    if (waitListRef.current.size === 0) {
      tryChange("enter");
      executeLifeCycleCallBack("onEnter");
    };
  };


  React.useEffect(() => {

    if ( firstTimeLoading ) return;
    // there is a page change but the component is the same as the active one the page assumes a enter state;
    // If on page A. One could route to page B. The children would change but not finish updating. Then if he
    // returns to page A, the page would change but the corresponding state would be a from exit to enter.
    if (children.type.prototype === activePage.type.prototype || !activePage ) {
      tryChange("enter");
      executeLifeCycleCallBack("onEnter");
    } else {
      tryChange("exit");
      executeLifeCycleCallBack("onExit");
    }
  }, [children]);

  React.useEffect(() => {
    
    if (waitListRef.current.size === 0) syncActivePage();
  }, [pageState, waitListRef.current.size]);

  const page = {
    waitFor,
    tryChange,
    removeHold,
    currentState: pageState,
    currentPath: pathRef.current,
    addEventListener: (event: keyof lifeCycle, callback: lifeCycleCallback) => {
      const validKeys = Object.keys(lifeCyclesRef.current);
      if (!validKeys.includes(event)) return;

      lifeCyclesRef.current[event].push(callback);
    },
  };

  return {
    activePage,
    pageState: page,
    Provider: RoutingStateProvider,
  };
};

export default usePageTransition;

export const useRoutingStateContext = () => {
  return React.useContext(RoutingStateContext);
};

interface RoutingStateContext {
  currentPath: string;
  waitFor: (id: string) => void;
  currentState: "exit" | "enter";
  removeHold: (id: string) => void;
  tryChange: (desiredState: "exit" | "enter") => void;
  addEventListener: (event: keyof lifeCycle, callback: lifeCycleCallback) => void;
}

const RoutingStateContext = React.createContext<RoutingStateContext>({
  currentPath: "",
  currentState: "enter",
  waitFor: () => undefined,
  removeHold: () => undefined,
  addEventListener: () => undefined,
  tryChange: () => console.log("state Not available"),
});

export const RoutingStateProvider: React.FC<RoutingStateContext> = ({ children, ...contextValues }) => {
  return <RoutingStateContext.Provider value={contextValues}>{children}</RoutingStateContext.Provider>;
};
