import "../styles/globals.css";
import Layout from "../components/Layout";


interface Props {
  Component: React.FC & {  getNavigation: () => React.FC },
  pageProps: any

}
const MyApp: React.FC<Props> = ({ Component, pageProps }) => {


  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
