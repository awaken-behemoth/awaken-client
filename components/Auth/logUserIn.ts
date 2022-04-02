import axios from "axios";
import UserCredentials from "./UserCredentials";

/**
 * Log user in from given email and password
 *
 * @param userCredentials email and password
 * @returns a promise with a status code
 */
const LogUserIn = async (userCredentials: UserCredentials) => {
  return (await axios
    .post("/api/auth/login", userCredentials)
    .catch((error) => error.response)) as Promise<{ status: number }>;
};

export default LogUserIn;
