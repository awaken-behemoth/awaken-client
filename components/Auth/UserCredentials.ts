/** Username and password used in Basic authentication */
export type UserCredentialsBasic = {
  type: "basic",
  email: string;
  password: string;
};

/** GoogleToken used in google Oauth authentication  */
export type UserCredentialsGoogle = {
  type: "google",
  googleAccessToken: string;
};

/** Credentials accepted by authentication endpoints for user authentication */
type UserCredentials = UserCredentialsGoogle | UserCredentialsBasic;

export default UserCredentials;
