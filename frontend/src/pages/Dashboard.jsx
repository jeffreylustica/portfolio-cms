import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { Bars3Icon } from "@heroicons/react/24/solid";

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
      <SideBar />
      <div className="min-md:ml-[300px]">
        <Bars3Icon className="size-8" />

        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
