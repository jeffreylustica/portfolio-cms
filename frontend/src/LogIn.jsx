import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const LogIn = () => {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5555/api/login", {
        username: inputs.username,
        password: inputs.password,
      })  

      const data = res.data
      console.log(data)
      if (data) {
        return data
      } else {
        alert("incorrect username/password")
      }
      
    } catch (error) {
      console.log(error.response.data.message)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendRequest()
      if (data) {
        history("/account")
      }
    } catch (error) {
      console.error("Error during login:", error);
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
          value={inputs.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LogIn;
