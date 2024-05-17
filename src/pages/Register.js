import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lightGreen">
      <h1 className="text-2xl text-teal mb-8">Register</h1>
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
          type="email"
          placeholder="email"
          name="email"
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
          Register
        </button>
        {err && <p className="text-red-500 text-sm text-center">{err}</p>}
        <span className="text-sm text-center">
          Do you have an account? <Link to="/login" className="text-teal">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
