import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import PointsContext from "../../context/pointsContext";

const Navbar = () => {
  const navigate = useNavigate();
  const ctx = useContext(PointsContext);

  const logout = () => {
    localStorage.removeItem("authToken");
    ctx.setIsLoggedIn(false);
    navigate("/login");
  };

  const links = [
    { key: "home", url: "/", name: "Home" },
    { key: "image", url: "/image-generator", name: "Image Generator" },
    { key: "history", url: "/history", name: "History" },
    { key: "contact", url: "/contact", name: "Contact" },
    { key: "signup", url: "/signup", name: "Sign Up" },
    { key: "login", url: "/login", name: "Login" },
  ];

  return (
    <div className="navbar-container">
      <div className="links">
        {links.map((link) => (
          <NavLink key={link.key} to={link.url} activeClassName="active" exact>
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className="points">Points: {ctx.userPoints}</div>
      <div className="auth">
        {ctx.isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
