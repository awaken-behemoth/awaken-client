
type UserCredentials =
  | {
      email: string;
      password: string;
    }
  | {
      googleId: string;
    };

export default UserCredentials;
