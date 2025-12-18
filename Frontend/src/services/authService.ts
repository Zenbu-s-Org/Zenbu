import { getAuthHeaders } from "../config/apiConfig";
import type { AuthResponse, CurrentUserResponse } from "../types/authTypes";

class AuthService {
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    const response = await fetch(`api/auth/register`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`api/auth/login`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  }

  async getCurrentUser(): Promise<CurrentUserResponse> {
    const response = await fetch(`api/auth/me`, {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to get user");
    return data;
  }

  async logout(): Promise<void> {
    await fetch(`api/auth/logout`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
    });
  }
}

export const authAPI = new AuthService();
