export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const getAuthHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
  "zenbu-key": import.meta.env.VITE_API_KEY,
});
