
type UserCredentials =
  | {
      email: string;
      password: string;
    }
  | {
      googleIdToken: string;
    };

export default UserCredentials;
