import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/login", {
        email,
        password,
      });
      alert("Login succesful");
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => e.target.value}
          />
          <button className="primary">Log in</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link to="/register" className="underline text-gray-700">
              Register now
            </Link>
            `
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
