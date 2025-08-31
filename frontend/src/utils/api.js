import axios from "axios";
import { store, authActions } from "../store";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      store.dispatch(authActions.logout());
      // toast.error("Session Expired!");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
