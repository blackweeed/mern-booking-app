import React from "react";

const LoginPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="primary">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
