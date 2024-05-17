import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer className="mt-20 px-4 py-5 bg-lightGreen flex justify-between items-center text-sm">
      <img src={Logo} alt="Logo" className="h-12" />
      <span>
        Made with <span className="text-red-500">&hearts;</span> and{" "}
        <b>React.js</b>.
      </span>
    </footer>
  );
};

export default Footer;
