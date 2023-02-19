import { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import toast, { Toaster } from "react-hot-toast";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { ethers } from "ethers";
import axios from "axios";
// import { json2csv } from "json-2-csv";
// import { parseAsync } from "json2csv/lib/json2csv";
import json2csv from "json2csv";
import { connectors } from "./connectors";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { truncateAddress } from "./utils";
import {
  INFURA_API_KEY,
  INFURA_URL,
  ADMIN_WALLET,
  API_KEY,
} from "utils/api.contant";
import Metamask from "../../assets/images/metamask.png";
import Coinbase from "../../assets/images/coinbaseWalletIcon.svg";
import Wallet from "../../assets/images/walletConnectIcon.svg";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";

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
  const [ensName, setEnsName] = useState("");
  const URL = INFURA_URL + INFURA_API_KEY;

  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();

  const network = 97;
  useEffect(() => {
    console.log("account", account);
    console.log("Admin", ADMIN_WALLET);
    resolveName();
    if (account) {
      library?.getBalance(account).then((result) => {});
    } else {
    }
  }, [account, library]);

  const resolveName = async () => {
    const provider = new ethers.providers.JsonRpcProvider(URL);
    const response = await provider.lookupAddress(account);
    console.log("ens", response);
    setEnsName(response);
    return;
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, [activate]);

  function closeModal() {
    setIsOpen(false);
  }

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

  const csvDownload = async () => {
    try {
      if (account) {
        const body = await axios.get(`${API_KEY}/address/`);
        console.log("body", body.data.addressData);
        const csv = json2csv.parse(body.data.addressData);

        // Create a downloadable link for the CSV file
        const csvData =
          "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        const downloadLink = document.createElement("a");
        downloadLink.href = csvData;
        downloadLink.download = "my-data.csv";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  <button className="text-[20px] leading-[30px] bg-black hover:bg-white/10 duration-100 border-2 border-[#252525] px-[30px] py-[15px] rounded-[70px] lowercase">
                    {ensName ? ensName : truncateAddress(account)}{" "}
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </button>
                </MenuButton>
              }
            >
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
                {account === ADMIN_WALLET && (
                  <MenuItem className="text-[20px] text-gray-300 pt-[13px]">
                    <div
                      onClick={csvDownload}
                      className="hover:opacity-80 duration-100"
                    >
                      <FaFileDownload className="inline mr-[10px]" size={30} />
                      CSV Download
                    </div>
                  </MenuItem>
                )}
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
