import React from "react";

const LogIn = () => {
  return (
    <div>
      <h1>Log in</h1>
      <form action="">
        <label htmlFor="username"></label>
        <input id="username" type="text" placeholder="Username" />
        <label htmlFor="password"></label>
        <input id="password" type="text" placeholder="Password" />
      </form>
    </div>
  );
};

export default LogIn;
