import { useState } from "react";
import { Routes, Route } from "react-router";
import SignIn from "./SignIn";
import LogIn from "./LogIn";
import Account from "./Account";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
