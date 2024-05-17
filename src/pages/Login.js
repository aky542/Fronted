import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lightGreen">
      <h1 className="text-teal text-2xl mb-8">Login</h1>
      <form className="flex flex-col items-center gap-4 p-8 bg-white w-80">
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          className="p-2 border-b border-gray-400 focus:outline-none"
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          className="p-2 border-b border-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-teal text-white rounded cursor-pointer"
        >
          Login
        </button>
        {err && <p className="text-red-500 text-sm text-center">{err}</p>}
        <span className="text-sm text-center">
          Don't you have an account?{" "}
          <Link to="/register" className="text-teal">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
