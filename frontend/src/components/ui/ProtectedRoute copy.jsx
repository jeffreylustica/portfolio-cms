import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { authActions } from "../../store";
import Spinner from "./Spinner";
import api from "../../utils/api";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await api.get(`/api/user-loggedin`);

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
