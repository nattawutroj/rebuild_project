export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL;

export const ENDPOINTS = {
  authenticate: `${API_AUTH_URL}/login`,
  courses: `${API_BASE_URL}/courses`,
};
