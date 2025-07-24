import axios from "axios";

// Axios instance with base URL & config
const api = axios.create({
  baseURL: "/api/user",
  withCredentials: true, // if your backend uses cookies for auth
});

// Signup
export const signup = async (data) => {
  return api.post("/signup", data);
};

// Login
export const login = async (data) => {
  return api.post("/login", data);
};

// Logout
export const logout = async () => {
  return api.post("/logout");
};

// Get all users
export const getAllUsers = async () => {
  return api.get("/allusers");
};

export default api;
