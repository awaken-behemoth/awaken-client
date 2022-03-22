import "../styles/globals.css";
import Layout from "../components/Layout";


interface Props {
  Component: React.FC & { navSettings: { display: boolean}},
  pageProps: any

}
const MyApp: React.FC<Props> = ({ Component, pageProps }) => {

  return (
    <Layout  navSettings={Component.navSettings}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
