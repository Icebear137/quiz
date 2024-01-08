import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { ToastContainer } from "react-toastify";

const Layout = ({ props }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={true}
        pauseOnHover={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggablePercent={60}
      />
    </>
  );
};

export default Layout;
