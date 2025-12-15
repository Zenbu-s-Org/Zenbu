export interface AuthResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

export interface CurrentUserResponse {
  success: boolean;
  user: User;
}
