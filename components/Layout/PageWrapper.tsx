import React from "react";
import usePageTransition from "../../utils/hook/usePageTransition";
import ThemeProvider from "./ThemeProvider";
import TransitionManager from "./TransitionManager";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { Provider, pageState, activePage } = usePageTransition(children as React.ReactNode & {type: {prototype : string}});

  return (
    <>
      <ThemeProvider>
        <Provider {...pageState}>
          <TransitionManager>
            <div className="w-screen h-screen">{activePage}</div>
          </TransitionManager>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default Layout;
