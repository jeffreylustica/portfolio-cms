import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const LogIn = () => {
  const history = useNavigate();

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
      history("/account");
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
    <div>
      <h1>Log in</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        <input
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
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LogIn;
