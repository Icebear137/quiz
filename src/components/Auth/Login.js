import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/userSlice";
import { getLogin } from "../../api/apiServices";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }

    let data = await getLogin(email, password);
    console.log(data);
    if (+data.EC === 0) {
      dispatch(loginSuccess(data.DT));
      toast.success("Login successfully");
      navigate("/");
    }
    if (data.EC !== 0) {
      toast.error(data.EM);
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
        <span className="underline">Return to Home</span>
      </div>
      <h1 className="text-4xl font-bold mb-10">Login</h1>
      <div className="flex flex-col form-group">
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
          onClick={() => handleLogin()}
        >
          Login
        </button>
        <div className="mt-[10px]">
          <span>Don't have an account?</span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
