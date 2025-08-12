import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { authActions } from "../../store";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
        console.log(error.message);
        dispatch(authActions.logout());
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [dispatch]);

  if (isChecking) {
    return <Spinner />; // Optional: better UX
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
