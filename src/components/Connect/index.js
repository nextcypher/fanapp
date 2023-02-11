// import toast from "react-hot-toast"
// import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
// import { formatEther } from '@ethersproject/units'
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import toast, { Toaster } from "react-hot-toast";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import { connectors } from "./connectors";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { truncateAddress } from "./utils";
import Metamask from "../../assets/images/metamask.png";
import Coinbase from "../../assets/images/coinbaseWalletIcon.svg";
import Wallet from "../../assets/images/walletConnectIcon.svg";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";

const customStyles = {
  content: {
    width: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#191b1f",
    color: "white",
    borderRadius: "12px",
  },
};

Modal.setAppElement("#root");

const ConnectWallet = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();

  const network = 97;
  useEffect(() => {
    if (account) {
      library?.getBalance(account).then((result) => {
        // setBalances(parseFloat(formatEther(BigNumber.from(result))))
      });
    } else {
      // toast('Please connect the wallet!', {
      //   icon: '⚠️',
      // });
    }
  }, [account, library]);

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, [activate]);

  function closeModal() {
    setIsOpen(false);
  }
  // const copy = (value) => {
  //   navigator.clipboard.writeText(value);
  //   toast.success("Copied!");
  // };

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
    toast("Logged out successfully", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      duration: 2000,
    });
  };
  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };
  // const switchNetwork = async () => {
  //   try {
  //     await library.provider.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: toHex(network) }]
  //     });
  //   } catch (switchError) {
  //     console.log(switchError)
  //   }
  // };
  const selectWallet = (key) => {
    switch (key) {
      case 0: {
        activate(connectors.injected);
        setProvider("injected");
        closeModal();
        break;
      }
      case 1: {
        activate(connectors.walletConnect);
        setProvider("walletConnect");
        closeModal();
        break;
      }
      case 2: {
        activate(connectors.coinbaseWallet);
        setProvider("coinbaseWallet");
        closeModal();
        break;
      }
      default:
        break;
    }
  };
  useEffect(() => {
    if (library && chainId !== network) {
      // switchNetwork()
    }
  }, [library, chainId]);

  return (
    <>
      {/* home title and sub title */}
      <Toaster position="bottom-right" reverseOrder={false} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h2 style={{ textAlign: "center", fontSize: "24px" }}>
          Connect Wallet
        </h2>
        <div className="flex flex-col">
          <button className="walletButton" onClick={() => selectWallet(0)}>
            <span>MetaMask</span>
            <img src={Metamask} alt="metamask" />
          </button>
          <button className="walletButton" onClick={() => selectWallet(1)}>
            <span>WalletConnect</span>
            <img src={Coinbase} alt="coinbase" />
          </button>
          <button className="walletButton" onClick={() => selectWallet(2)}>
            <span>Coinbase Wallet</span>
            <img src={Wallet} alt="wallet" />
          </button>
        </div>
      </Modal>
      <div className="wallet">
        {active ? (
          <div className="dropdown">
            <Menu
              menuButton={
                <MenuButton>
                  <button className="font-['Ailerons'] text-[20px] leading-[30px] bg-black hover:bg-white/10 duration-100 border-2 border-[#252525] px-[30px] py-[15px] rounded-[70px]">
                    {truncateAddress(account)}{" "}
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </button>
                </MenuButton>
              }
            >
              {/* <Link to={"./dashboard"}><div className="hover:text-[#10CD00]">DASHBOARD</div></Link> */}
              <div className="flex flex-col justify-between bg-black border border-[#252525] w-[250px] h-auto rounded-[10px] p-[30px] ml-[20px]">
                <MenuItem className="text-[20px] text-gray-300">
                  <Link to={"./profile"}>
                    <div className="hover:opacity-80 duration-100">
                      <FaUserAlt
                        className="inline mr-[10px] ml-[3px]"
                        size={25}
                      />
                      Profile
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem className="text-[20px] text-gray-300 pt-[13px]">
                  <Link to={"./setting"}>
                    <div className="hover:opacity-80 duration-100">
                      <IoMdSettings className="inline mr-[10px]" size={30} />
                      Settings
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem className="text-[20px] text-gray-300 pt-[13px]">
                  <Link to={"./collection"}>
                    <div className="hover:opacity-80 duration-100">
                      <BsGridFill className="inline mr-[10px]" size={30} />
                      Collections
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem className="text-[20px] text-gray-300 pt-[13px]">
                  <Link to={"./"}>
                    <div
                      className="hover:opacity-80 duration-100"
                      onClick={disconnect}
                    >
                      <BiLogOut className="inline mr-[10px]" size={30} />
                      Logout
                    </div>
                  </Link>
                </MenuItem>
              </div>
            </Menu>
          </div>
        ) : (
          <button
            className="font-['Ailerons'] text-[20px] leading-[30px] bg-black hover:bg-white/10 duration-100 border-2 border-[#252525] px-[30px] py-[15px] rounded-[70px]"
            onClick={() => setIsOpen(true)}
          >
            CONNECT
          </button>
        )}
      </div>
    </>
  );
};

export default ConnectWallet;
