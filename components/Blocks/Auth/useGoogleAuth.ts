import React from "react";
import { useFirstTimeLoading } from "react-with-daniel";
import addScript from "../../../utils/addScript";

const useGoogleAuth = () => {

    const firstTimeLoading = useFirstTimeLoading();

  React.useEffect(() => {

    if (!firstTimeLoading) return;

    addScript({
      src: "https://apis.google.com/js/platform.js",
      defer: true,
      async: true,
    })
    .onload = () => {
        console.log("script loaded");
        gapi.load("auth2", function () {
            window.gapi.auth2.init({client_id: "624562493638-8nt1s7i13f0fdkh1tdqt9ip5s9omm1uf.apps.googleusercontent.com"});
          });
    }

  }, []);

  const login = () => {
    let auth2 = window.gapi.auth2.getAuthInstance();

    auth2.signIn();
    return auth2.currentUser.get().getAuthResponse().id_token
  };

  return {
    login,
  };
};

export default useGoogleAuth;
