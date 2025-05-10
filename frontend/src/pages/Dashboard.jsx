import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { Bars3Icon } from "@heroicons/react/24/solid";
import PersonalDetailsForm from "../components/PersonalDetailsForm";

const Dashboard = () => {
  // const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get("http://localhost:5555/api/user", {
        withCredentials: true,
      });
      console.log(response.data.username);
    };

    const getCollections = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/collections", {
          withCredentials: true,
        });
        console.log(response.data.collections)
        const dbCollections = response.data.collections
        setCollections(dbCollections)
      } catch (error) {
        console.log("Failed to load collections", error)
      }
    };

    getUserData();
    getCollections();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <SideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        stopPropagation={stopPropagation}
        collections={collections}
      />
      <div className="min-md:ml-[300px]">
        <Bars3Icon
          className="size-8 md:hidden ml-auto"
          onClick={toggleSidebar}
        />
        <div>
          <PersonalDetailsForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
