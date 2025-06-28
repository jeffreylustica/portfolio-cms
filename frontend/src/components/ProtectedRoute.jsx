import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { authActions } from "../store";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5555/api/user-loggedin", {
          withCredentials: true,
        });

        if (res.data.isLoggedIn) {
          dispatch(authActions.login());
        } else {
          dispatch(authActions.logout());
        }
      } catch (error) {
        dispatch(authActions.logout());
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [dispatch]);

  if (isChecking) {
    return <div>Checking authentication...</div>; // Optional: better UX
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
