import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router";
import { Bars3Icon } from "@heroicons/react/24/solid";

const DashboardLayout = () => {
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
    <>
      <SideBar />
      <div className="min-md:ml-[300px]">
        <Bars3Icon className="size-8" />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
