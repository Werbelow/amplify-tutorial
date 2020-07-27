import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../auth";
const NavBar = ({ user }) => {
  return (
    <div className="navbar">
      {user ? (
        <button onClick={logout}>log out</button>
      ) : (
        <>
          <Link to="/login">
            <button>login</button>
          </Link>
          <Link to="/signup">
            <button>sign up</button>
          </Link>
        </>
      )}
    </div>
  );
};
export default NavBar;
