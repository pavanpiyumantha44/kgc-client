// User type
export interface IUser {
  userId: string;
  name: string;
  email: string;
  phone?: string;
}

// Redux Auth state
export interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Payload for login/setCredentials
export interface CredentialsPayload {
  user: IUser;
  token: string;
}
