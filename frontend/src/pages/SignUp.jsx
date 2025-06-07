import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignUp = () => {
  const history = useNavigate();

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
          history("/login");
        }
      } catch (error) {
        console.log(error);
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

      console.log(response);
      history("/login");
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
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Sign Up</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col border-2 border-blue-200 rounded-md text-center p-4 w-full"
        >
          <label htmlFor="username" className="sr-only"></label>
          <input
            className="px-4 py-2 mb-4 focus:outline-none"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="password" className="sr-only"></label>
          <input
            className="px-4 py-2 mb-4 focus:outline-none"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            pattern=".{6,}"
            title="Password must be at least 6 characters long"
          />

          <button
            type="submit"
            className="text-lg bg-blue-400 text-white rounded-sm px-4 py-2 hover:bg-blue-300 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
