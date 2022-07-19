import axios, { AxiosError } from 'axios';

import UserCredentials from './UserCredentials';

/**
 * Log user in from given email and password
 *
 * @param userCredentials email and password
 * @returns a promise with a status code
 */
export const LogUserIn = async (userCredentials: UserCredentials) => {
  return (await axios
    .post('/api/auth/login', userCredentials)
    .catch((error : AxiosError) => error.response));
};

/**
 * Create a from given credentials
 *
 * @param userCredentials use email and password OR googleId token
 * @returns a promise;
 */
export const createUser = async (userCredentials: UserCredentials) => {
  return (await axios
    .post('/api/user', userCredentials)
    .catch((error : AxiosError) => error.response)) ;
};
