import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
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
      <SideBar />
      <div className="min-md:ml-[300px]">
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M5 7h14M5 12h14M5 17h14"
          />
        </svg>

        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
