import { Head } from "next/document";
import React from "react";
import usePageTransition from "../../utils/hook/usePageTransition";
import Navigation from "./Navigation";
import ThemeProvider from "./ThemeProvider";
import TransitionManager from "./TransitionManager";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { Provider, pageState, activePage } = usePageTransition(children);

  return (
    <>
      <ThemeProvider>
        <Provider {...pageState}>
          <TransitionManager>
            <Navigation>
              <div className="w-screen h-screen">{activePage}</div>
            </Navigation>
          </TransitionManager>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default Layout;
