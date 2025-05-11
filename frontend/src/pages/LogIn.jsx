import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const LogIn = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5555/api/login",
        {
          username: formData.username,
          password: formData.password,
        },
        { withCredentials: true }
      );

      // console.log(response.data);
      // localStorage.setItem("token", response.data.token);
      dispatch(authActions.login())
      history("/dashboard");
    } catch (error) {
      console.log(error.message);
    } finally {
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[600px] p-2">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Log In</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col border-2 border-blue-200 rounded-md text-center p-4 w-full"
        >
          <label htmlFor="username" className="sr-only"></label>
          <input
            className="px-4 py-2 mb-4 focus:outline-none"
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
            className="px-4 py-2 mb-4 focus:outline-none"
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
            className="text-lg bg-blue-400 text-white rounded-sm px-4 py-2 hover:bg-blue-300 cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
