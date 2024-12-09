import React from "react";

const SignIn = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <form action="">
        <label htmlFor="username"></label>
        <input id="username" type="text" placeholder="Username" />
        <label htmlFor="password"></label>
        <input id="password" type="password" placeholder="Password" />
      </form>
    </div>
  );
};

export default SignIn;
