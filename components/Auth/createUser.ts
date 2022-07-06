import axios from 'axios';

import UserCredentials from './UserCredentials';

/**
 * Create a from given credentials
 *
 * @param userCredentials use email and password OR googleId token
 * @returns a promise;
 */
const createUser = async (userCredentials: UserCredentials) => {
  return (await axios
    .post('/api/user', userCredentials)
    .catch((error) => error.response)) as Promise<{
    status: number;
  }>;
};

export default createUser;
