import React from 'react';
import { useFirstTimeLoading } from 'react-with-daniel';

import addScript from '../../utils/addScript';

/**
 * Load Scripts required to set up google auth2 authentication;
 *
 * @returns a controller to manage google auth2 authentication;
 */
const useGoogleAuth = () => {
  const firstTimeLoading = useFirstTimeLoading();

  React.useEffect(() => {
    if (!firstTimeLoading) return;

    addScript({
      src: 'https://apis.google.com/js/platform.js',
      defer: true,
      async: true
    }).onload = () => {
      gapi.load('auth2', function () {
        window.gapi.auth2.init({
          client_id:
            '624562493638-8nt1s7i13f0fdkh1tdqt9ip5s9omm1uf.apps.googleusercontent.com'
        });
      });
    };
  }, [firstTimeLoading]);

  /**
   * Request google sign in
   *
   */
  const login = async () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    await auth2.signIn();
  };

  /**
   * Get a user token than should e sent to the backend for user authorization
   *
   * @returns user Token
   */
  const getGoogleIdToken = async () => {
    const auth2 = window.gapi.auth2.getAuthInstance();

    if (!auth2.isSignIn) {
      await login();
    }

    const token: string = await auth2.currentUser.get().getAuthResponse()
      .id_token;

    return token;
  };

  return {
    login,
    getGoogleIdToken
  };
};

export default useGoogleAuth;
