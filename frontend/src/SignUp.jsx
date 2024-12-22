import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignUp = () => {
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
    console.log(inputs);
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5555/api/signup", {
        username: inputs.username,
        password: inputs.password,
      });

      const data = await res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
    // sendRequest().then(() => history("/login"));
  };
  return (
    <div>
      <h1>Sign in</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={inputs.name}
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignUp;