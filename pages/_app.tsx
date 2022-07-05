import "../styles/globals.css";
import Wrapper from "../components/Layout/PageWrapper";
import { NextPage } from "next";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?: (
    page: ReactElement<any, JSXElementConstructor<any>>
  ) =>  ReactElement<any, JSXElementConstructor<any>>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <Wrapper child={getLayout(<Component {...pageProps} />)}></Wrapper>;
};

export default MyApp;
