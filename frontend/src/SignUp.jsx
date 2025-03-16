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
    <div>
      <h1>Sign up</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignUp;
