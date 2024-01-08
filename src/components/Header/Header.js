import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Real Quiz
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/user" className="nav-link">
              User
            </NavLink>
          </Nav>
          <Nav className="flex gap-[10px]">
            {isAuthenticated === false ? (
              <>
                <button
                  onClick={() => handleLogin()}
                  className="rounded-[5px] border-[1px] border-solid px-[10px] py-[5px] hover:bg-white hover:scale-105"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className=" rounded-[5px] border-[1px] border-solid px-[10px] py-[5px] bg-[#535353] text-white hover:bg-black hover:scale-105"
                >
                  Sign in
                </button>
              </>
            ) : (
              <NavDropdown title={account.username} id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Log out</NavDropdown.Item>
              </NavDropdown>
            )}
            {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item>Log in</NavDropdown.Item>
              <NavDropdown.Item>Log out </NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
