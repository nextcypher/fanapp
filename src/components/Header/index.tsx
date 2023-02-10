import { useState } from "react";
import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import ConnectWallet from "components/Connect";
import 'react-modern-drawer/dist/index.css';
import logoImg from '../../assets/images/next_cyber_logo.png';

const Header = ({ isHover }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div className="flex items-center justify-between w-[90%] h-[71px] mx-auto border-b border-white/20 top-0 z-10 transition-all duration-300">
      <NavLink
        className="flex items-center text-xl md:text-2xl hover:opacity-80"
        to={{
          pathname: "/",
        }}
      >
        <div className="font-['Ailerons'] text-[46px]">
          <img src={logoImg} alt="LogoImage" className="h-[50px]"></img>
        </div>
      </NavLink>
      <div className="flex items-center">
        <div className="flex justify-end items-center z-50">
          <div className="group ml-2 cursor-pointer">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
