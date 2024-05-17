import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-2">
        <div className="flex justify-between items-center">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-24" />
            </Link>
          </div>
          <div className="links flex gap-4 items-center">
            <Link className="link" to="/?cat=art">
              <h6 className="text-sm font-light">ART</h6>
            </Link>
            <Link className="link" to="/?cat=science">
              <h6 className="text-sm font-light">SCIENCE</h6>
            </Link>
            <Link className="link" to="/?cat=technology">
              <h6 className="text-sm font-light">TECHNOLOGY</h6>
            </Link>
            <Link className="link" to="/?cat=cinema">
              <h6 className="text-sm font-light">CINEMA</h6>
            </Link>
            <Link className="link" to="/?cat=design">
              <h6 className="text-sm font-light">DESIGN</h6>
            </Link>
            <Link className="link" to="/?cat=food">
              <h6 className="text-sm font-light">FOOD</h6>
            </Link>
            <span className="text-sm">{currentUser?.username}</span>
            {currentUser ? (
              <span className="text-sm cursor-pointer" onClick={logout}>
                Logout
              </span>
            ) : (
              <Link className="link" to="/login">
                Login
              </Link>
            )}
            <span className="write bg-lightGreen w-12 h-12 rounded-full flex items-center justify-center text-white font-light cursor-pointer hover:text-teal hover:bg-white">
              <Link to="/write">Write</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
