import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import InlineLoader from "../components/ui/InlineLoader";
import api from "../utils/api";

const LogIn = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post(`/api/login`, {
        username: formData.username,
        password: formData.password,
      });

      setFormData({
        username: "",
        password: "",
      });

      dispatch(authActions.login());
      navigate("/dashboard");
    } catch (error) {
      if (import.meta.env.MODE === "development") {
        console.error(error);
      }

      if (error.response && error.response.status === 401) {
        toast.error("Incorrect username or password. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Toaster />
      <div className="w-[400px] p-2 -translate-y-1/2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-xl p-4 md:px-10  shadow-xl shadow-blue-100 bg-white text-center w-full"
        >
          <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Log In
          </h1>

          <label htmlFor="username" className="sr-only"></label>
          <input
            className="px-4 py-2 mb-4 text-sm focus:outline-none bg-blue-50 rounded-sm border border-transparent focus:border-blue-200 focus:shadow-sm"
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="password"></label>
          <input
            className="px-4 py-2 mb-4 text-sm focus:outline-none bg-blue-50 rounded-sm border border-transparent focus:border-blue-200 focus:shadow-sm"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className={`text-lg bg-blue-500 text-white rounded-sm px-4 py-2 ${
              isLoading
                ? "cursor-not-allowed hover:bg-blue-500"
                : "cursor-pointer hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? <InlineLoader /> : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
