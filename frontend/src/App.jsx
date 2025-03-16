import { Routes, Route } from "react-router";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/account" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
