import axios from "axios";
import NFTCardClaim from "components/NFTCardClaim";
import Container from "components/Shared/Container";
import "keen-slider/keen-slider.min.css";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import downloadVector from "../../assets/images/download.svg";
import pdfImg from "../../assets/images/pdf-new.png";
import {
    ALCHEMY_API_KEY,
    baseURL,
    CONTRACT_ADDRESS,
    PDF_PASSWORD,
    PDF_PATH,
} from "../../utils/api.contant";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Faq = () => {
    const { account } = useWeb3React();
    const [nfts, setNFTs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const fetchURL = `${baseURL + ALCHEMY_API_KEY}/getNFTs/?owner=${account}`;
    const options = {
        method: "GET",
        url: fetchURL,
        params: { omitMetadata: "false", contractAddresses: [CONTRACT_ADDRESS] },
        headers: { accept: "application/json" },
    };

    const fetchCollection = async () => {
        const itemArray = [];
        axios
            .request(options)
            .then(function (response) {
                response?.data?.ownedNfts.map((nft) => {
                    itemArray.push(nft.metadata);
                });
            })
            .catch(function (error) {
                console.error(error);
            });
        await new Promise((r) => setTimeout(r, 5000));
        setNFTs(itemArray.slice(0, itemArray.length > 5 ? 5 : itemArray.length));
        setIsLoading(true);
    };

    useEffect(() => {
        fetchCollection();
    }, [account]);

    const download = async () => {
        const filePath = PDF_PATH;
        var link = document.createElement("a");
        link.href = filePath;
        link.download = filePath.substr(filePath.lastIndexOf("/") + 1);
        link.click();
    };
    return (
        <Container className="pt-[108px] px-auto">
            <div className="w-[60%] mx-auto">
                <details className="border-2 border-[#252525] rounded-[10px] pt-5 pb-5 px-5 relative mb-1 bg-black  duration-500 mb-[12px]">
                    <summary className="list-none font-semibold relative text-[20px] cursor-pointer pr-7 transition-colors duration-200 text-[#959595] hover:text-white hover:underline focus:outline-none">
                        How to set and check your profile information?
                        <div className="absolute top-1 right-0 bg-[#252525] hover:bg-slate rounded-full px-1 py-0.5 cursor-pointer visible">
                            <svg
                                className="h-10 w-8 text-pink-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </summary>
                    <p className="pt-3 transition-opacity duration-500 text-[16px] pl-[20px] text-[#959595] hover:text-white">
                        1. Click on the "Settings" item in the drop-down menu of the "Connect Wallet" button to visit the settings page.<br></br>
                        2. Fill out all the required fields in the settings page and validate the information.<br></br>
                        3. Save all the settings and check your wallet sign in your wallet to ensure that the information has been saved correctly.<br></br>
                        4. Once you have saved your settings, you can view your information in your profile page.<br></br>
                    </p >
                </details >
                <details className="border-2 border-[#252525] rounded-[10px] pt-5 pb-5 px-5 relative mb-1 bg-black  duration-500 mb-[36px]">
                    <summary className="list-none font-semibold relative text-[20px] cursor-pointer pr-7 transition-colors duration-200 text-[#959595] hover:text-white focus:outline-none">
                        How to claim your NFT to get comic book?
                        <div className="absolute top-1 right-0 bg-[#252525] hover:bg-slate rounded-full px-1 py-0.5 cursor-pointer visible">
                            <svg
                                className="h-10 w-8 text-pink-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </summary>
                    <p className="pt-3 transition-opacity duration-500 text-[16px] pl-[20px] text-[#959595] hover:text-white">
                        1. Visit the Collection or Home page and check if there are any NFT cards that do not have a "claimed" badge.<br></br>
                        2. Click on the NFT card and sign in to your wallet.<br></br>
                        3. Your shipping address will be stored in our delivery team database.<br></br>
                        4. Finally, you will receive your comic book soon.<br></br>
                    </p >
                </details >
            </div >
        </Container >
    );
};
export default Faq;
