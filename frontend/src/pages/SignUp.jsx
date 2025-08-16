import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../components/ui/Spinner.jsx";

const SignUp = () => {
  const [checkingUser, setCheckingUser] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/user-exists"
        );
        if (response.data.exists) {
          navigate("/login");
        }
      } catch (error) {
        if (import.meta.env.MODE === "development") {
          console.error(error);
        }

        toast.error("Something went wrong. Please try again later.");
      } finally {
        setCheckingUser(false);
      }
    };

    checkUserExists();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5555/api/signup", {
        username: formData.username,
        password: formData.password,
      });

      navigate("/login");
    } catch (error) {
      if (import.meta.env.MODE === "development") {
        console.error(error);
      }

      toast.error("Sign-up failed! Please try again.");
    } finally {
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  if (checkingUser) return <Spinner />;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster />
      <div
        className="w-[400px] p-2 -translate-y-1/2
      -full"
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col rounded-xl p-4 md:px-10  shadow-xl shadow-blue-100 bg-white text-center w-full"
        >
          <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Sign Up
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
            minLength="6"
            pattern=".{6,}"
            title="Password must be at least 6 characters long"
          />

          <button
            type="submit"
            className="text-lg bg-blue-500 text-white rounded-sm px-4 py-2 hover:bg-blue-600 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
