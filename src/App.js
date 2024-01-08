import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
