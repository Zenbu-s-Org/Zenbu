export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050/api";

export const getAuthHeaders = (includeToken = false) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (includeToken) {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};
