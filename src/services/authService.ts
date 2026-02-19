import API from "../utils/api";

export interface Person {
  userId: string;
  name: string;
  email: string;
  phone?: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  person?: Person;
  message?: string;
}

// Type-safe login API call
export const login = (payload: { email: string; password: string }) => {
  // <LoginResponse> tells Axios the type of response.data
  return API.post<LoginResponse>("/auth/login", payload);
};