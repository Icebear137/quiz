import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }

    let data = await axios.post("http://localhost:8081/api/v1/register", {
      email,
      password,
      username,
    });
    console.log(data);
    if (data && data.data && +data.data.EC === 0) {
      toast.success("Register successfully");
      navigate("/login");
    }
    if (data && data.data && +data.data.EC !== 0) {
      toast.error(data.data.EM);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="flex w-full ml-[50px] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <span className="">Return to Home</span>
      </div>
      <h1 className="text-4xl font-bold mb-10">Register</h1>
      <div className="flex flex-col form-group">
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          placeholder="Username"
          className="border-[1px] border-solid border-black rounded-[5px] px-[10px] py-[5px] mb-[10px]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border-[1px] border-solid border-black rounded-[5px] px-[10px] py-[5px] mb-[10px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border-[1px] border-solid border-black rounded-[5px] px-[10px] py-[5px] mb-[10px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-[10px] rounded-[5px] border-[1px] border-solid px-[10px] py-[5px] bg-[#535353] text-white hover:bg-black w-full"
          onClick={() => handleRegister()}
        >
          Register
        </button>
        <div className="mt-[10px]">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
