import { useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

const Account = () => {
  const token = localStorage.getItem("token");

  return (
    <div>
      <Navbar />
      <h1>Account</h1>
    </div>
  );
};

export default Account;
