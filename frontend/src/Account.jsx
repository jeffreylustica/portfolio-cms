import { useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

const Account = () => {
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5555/api/user", {
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Account</h1>
    </div>
  );
};

export default Account;
