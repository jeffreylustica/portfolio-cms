import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

const Dashboard = () => {
  // const token = localStorage.getItem("token");
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get("http://localhost:5555/api/user", {
        withCredentials: true,
      });
      console.log(response.data);
    };

    getUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
