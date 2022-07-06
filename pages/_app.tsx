import "../styles/globals.css";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Wrapper from "../components/Layout/PageWrapper";
import { JSXElementConstructor, ReactElement, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

/** Next js page that uses dynamic layout */
type NextPageWithLayout = NextPage & {
  getLayout?: (
    page: ReactElement<any, JSXElementConstructor<any>>
  ) => ReactElement<any, JSXElementConstructor<any>>;
};

/** Declares component that represents the page currently being rendered */
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Wrapper child={getLayout(<Component {...pageProps} />)} ></Wrapper>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
