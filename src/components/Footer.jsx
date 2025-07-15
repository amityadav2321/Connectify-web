import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-20 m relative z-10">
     
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <a className="hover:text-cyan-400 transition-colors cursor-pointer">
          About us
        </a>
        <a
          href="mailto:itsamityadav2307@gmail.com"
          className="hover:text-cyan-400 transition-colors"
        >
          Contact us
        </a>

      </div>

      
      <div className="flex justify-center gap-8 mb-6">
        
        <a
          href="mailto:itsamityadav2307@gmail.com"
          className="hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <FaEnvelope size={22} />
          <span className="hidden sm:inline">itsamityadav2307@gmail.com</span>
        </a>

        
        <a
          href="https://www.linkedin.com/in/amit-yadav23"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-400 transition-colors"
        >
          <FaLinkedin size={24} />
        </a>

        
        <a
          href="https://github.com/amityadav2321"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-400 transition-colors"
        >
          <FaGithub size={24} />
        </a>
      </div>

     
      <div className="text-center text-sm text-gray-400">
       Copyright © {new Date().getFullYear()} — All rights reserved by <span className="text-cyan-400">Amit Yadav</span>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tr from-fuchsia-500/10 to-transparent blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
