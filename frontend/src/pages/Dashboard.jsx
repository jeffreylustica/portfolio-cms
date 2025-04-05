import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Dashboard = () => {
  // const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get("http://localhost:5555/api/user", {
        withCredentials: true,
      });
      console.log(response.data);
    };

    getUserData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  return (
    <div>
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} stopPropagation={stopPropagation}/>
      <div className="min-md:ml-[300px]">
        <Bars3Icon className="size-8 md:hidden ml-auto" onClick={toggleSidebar}/>
        <h1>Forms</h1>
      </div>
    </div>
  );
};

export default Dashboard;
