import React from "react";
import usePageTransition from "../usePageTransition";
import Navigation from "./Navigatioin";
import ThemeProvider from "./ThemeProvider";
import TransitionManager from "./TransitionManager";

interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  const { Provider, pageState, activePage } = usePageTransition(children);

  return (
    <ThemeProvider>
      <Provider {...pageState}>
        <TransitionManager>
          <Navigation />
          <div className="w-screen">{activePage}</div>
        </TransitionManager>
      </Provider>
    </ThemeProvider>
  );
};

export default Layout;
