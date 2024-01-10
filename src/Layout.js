import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { ToastContainer } from "react-toastify";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageUser from "./components/Admin/ManageUsers/ManageUsers";
import ManageQuiz from "./components/Admin/Quiz/ManageQuiz";

const Layout = ({ props }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/user" element={<ListQuiz />} />
        </Route>
        <Route path="/admin" element={<App />}>
          <Route index element={<ManageUser />} />
          <Route path="/admin/quiz" element={<ManageQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={<h1 className="alert alert-danger">Not Found</h1>}
        />
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
