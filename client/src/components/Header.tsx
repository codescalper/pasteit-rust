import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; 

export default function Header() {
  return (
    <div className='flex justify-between  p-4 space-x-4'>
      <div>
        <a href="/">
        <h1 className="font-bold text-3xl text-inherit cursor-pointer">
          &lt;PasteIt <span className="text-lime-400">/</span>&gt;
        </h1>
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <a href="https://github.com/codescalper" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} className="text-gray-500 hover:text-green-500 transition ease-in-out" />
        </a>
        {/* <a href="https://www.youtube.com/@mhtcetshalamayanksingh" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={24} className="text-gray-500 hover:text-red-500 transition ease-in-out" />
        </a> */}
        <a href="https://www.linkedin.com/in/mayankonli" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} className="text-gray-500 hover:text-blue-500 transition ease-in-out" />
        </a>
        <a href="https://twitter.com/yourtwitterprofile" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} className="text-gray-500 hover:text-blue-300 transition ease-in-out" />
        </a>
        {/* <a href="https://www.instagram.com/mayankonweb" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} className="text-gray-500 hover:text-red-400 transition ease-in-out" />
        </a> */}
      <ThemeSwitcher />
    </div>
    </div>
  );
}
