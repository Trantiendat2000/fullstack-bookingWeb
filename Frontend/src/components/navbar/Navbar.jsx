import "./navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

  const user = props.user;
  const hotel = props.hotel;

  const handleClick = () => {
    if (!props.user) return;
    if (props.user) {
      navigate("/transaction", { state: { user, hotel } });
    } else {
      return;
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={() => navigate("/")}>
          Booking Website
        </span>
        {props.user ? (
          <div className="navItems">
            <p>{props.user.username}</p>
            <button className="navButton" onClick={() => handleClick()}>
              Transaction
            </button>
            <button className="navButton">
              <a href="/login">Log Out</a>
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">
              <a href="/register">Register</a>
            </button>
            <button className="navButton">
              <a href="/login">Log in</a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
