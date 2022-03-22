import React from "react";
import usePageTransition from "../usePageTransition";
import Navigation from "./Navigatioin";
import ThemeProvider from "./ThemeProvider";
import TransitionManager from "./TransitionManager";

interface Props {
  children: React.ReactNode;
  navSettings: { display: boolean };
}
const Layout: React.FC<Props> = ({ children, navSettings }) => {
  const { Provider, pageState, activePage } = usePageTransition(children);

  return (
    <ThemeProvider>
      <Provider {...pageState}>
        <TransitionManager>
          {navSettings?.display !== false && <Navigation />}

          <div className="w-screen h-screen">{activePage}</div>
          
        </TransitionManager>
      </Provider>
    </ThemeProvider>
  );
};

export default Layout;
