import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { authActions } from "../../store";
import Spinner from "./Spinner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/user-loggedin`, {
          withCredentials: true,
        });

        if (res.data.isLoggedIn) {
          dispatch(authActions.login());
        } else {
          dispatch(authActions.logout());
        }
      } catch (error) {
        if (import.meta.env.MODE === "development") {
          console.error(error.message);
        }
        dispatch(authActions.logout());
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [dispatch]);

  if (isChecking) {
    return <Spinner />;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
