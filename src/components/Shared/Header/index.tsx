import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import ConnectWallet from "components/Connect";
import Container from "components/Shared/Container";
import HeaderLink from "components/Shared/Header/HeaderLink";
import "react-modern-drawer/dist/index.css";
import { NavLink } from "react-router-dom";
import MenoIcon from "../../../assets/images/humberger-menu.svg";
import logoImg from "../../../assets/images/next_cyber_logo.png";

const Header = ({ scrolled }) => {
  return (
    <div
      className={`top-0 transition-all duration-300 sticky z-[1] ${scrolled ? "bg-black" : ""
        }`}
    >
      <Container className="flex flex-row items-center md:h-[96px] h-[76px] md:py-[28px] py-[18px]">
        <NavLink
          className="flex items-center text-xl md:text-2xl hover:opacity-80"
          to={{
            pathname: "/",
          }}
        >
          <div className="font-['Ailerons'] text-[46px]">
            <img
              src={logoImg}
              alt="LogoImage"
              className="md:h-[28px] h-[22px] shrink-0"
            />
          </div>
        </NavLink>
        <div className="md:hidden flex flex-row items-center ml-[auto] ">
          <ConnectWallet />
          <div className="dropdown">
            <Menu
              menuButton={
                <MenuButton>
                  <img
                    src={MenoIcon}
                    alt=""
                    className="md:hidden flex w-[40px] h-[40px] p-0 m-0"
                  />
                </MenuButton>
              }
            >
              <div className="flex flex-col justify-between bg-black border border-[#252525] w-[160px] h-auto rounded-[10px] p-[20px] mr-[20px]">
                <MenuItem className="text-[20px] text-gray-300  items-center flex justify-center">
                  <HeaderLink className="py-[13px]" to="/">
                    Home
                  </HeaderLink>
                </MenuItem>
                <MenuItem className="text-[20px] text-gray-300 items-center flex justify-center">
                  <HeaderLink className="py-[13px]" to="/collection">
                    Collections
                  </HeaderLink>
                </MenuItem>
                <MenuItem className="text-[20px] text-gray-300 items-center flex justify-center">
                  <HeaderLink className="py-[13px]" to="/faq">
                    FAQ
                  </HeaderLink>
                </MenuItem>
              </div>
            </Menu>
          </div>
        </div>
        {/* </div> */}
        <div className="flex-row items-center flex-1 md:flex hidden">
          <HeaderLink to="/" className="ml-[123px]">
            Home
          </HeaderLink>
          <HeaderLink to="/collection" className="ml-[52px]">
            Collection
          </HeaderLink>
          <HeaderLink to="/faq" className="ml-[52px]">
            FAQ
          </HeaderLink>
          <div className="flex-1" />
          <ConnectWallet />
        </div>
      </Container>
      <div className="border-b border-[#575757]" />
    </div>
  );
};

export default Header;
