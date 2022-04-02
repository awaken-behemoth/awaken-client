import Head from "next/head";
import useGoogleAuth from "./useGoogleAuth";


/**
 * This header is required to be present for a page that uses {@link useGoogleAuth}
 */
const GoogleAuthHeader = () => {
  return (
    <Head>
      <meta
        name="google-signin-client_id"
        content="624562493638-8nt1s7i13f0fdkh1tdqt9ip5s9omm1uf.apps.googleusercontent.com"
      />
    </Head>
  );
};

export default GoogleAuthHeader;
