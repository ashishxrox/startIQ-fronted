import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
        
        {/* Left - Logo / Brand */}
        <Link to="/" className="mb-4 md:mb-0 font-semibold text-gray-800 tracking-wide">
          StartIQ
        </Link>
        
        {/* Center - Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="auth" className="hover:text-gray-900 transition-colors">Login</Link>
          <a href="#services" className="hover:text-gray-900 transition-colors">Signup</a>
          {/* <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
          <a href="#privacy" className="hover:text-gray-900 transition-colors">Privacy</a> */}
        </div>
        
        {/* Right - Copyright */}
        <div className="text-gray-500">
          © {new Date().getFullYear()} StartIQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
