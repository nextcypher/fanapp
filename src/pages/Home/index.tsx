import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { useKeenSlider } from "keen-slider/react";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import {
  baseURL,
  CONTRACT_ADDRESS,
  ALCHEMY_API_KEY,
  API_KEY,
} from "../../utils/api.contant";
import pdfImage from "../../assets/images/pdf.png";
import NFTCard from "../../components/NFTCard";
import "keen-slider/keen-slider.min.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

// const account = "0x6FBb4B4Fa983B223bceEfC4AEbD543BB94745cF9";
const Home = () => {
  const { account } = useWeb3React();
  const [nfts, setNFTs] = useState([]);
  const [password, setPassword] = useState("");
  const [pdf, setPdf] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const fetchURL = `${baseURL + ALCHEMY_API_KEY}/getNFTs/?owner=${account}`;
  const options = {
    method: "GET",
    url: fetchURL,
    params: { omitMetadata: "false", contractAddresses: [CONTRACT_ADDRESS] },
    headers: { accept: "application/json" },
  };

  const [sliderRef] = useKeenSlider({
    loop: {
      min: -5,
      max: 5,
    },
  });

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
    console.log("itemArray", itemArray);
    setNFTs(itemArray.slice(0, itemArray.length > 4 ? 4 : itemArray.length));
    setIsLoading(true);
  };

  useEffect(() => {
    fetchCollection();
  }, [account]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (account) {
          axios
            .get(`${API_KEY}/pdf`)
            .then(function (response) {
              setPassword(response?.data.password);
              setPdf(response?.data.pdf);
              console.log("response", response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [account]);

  const download = () => {
    const blob = new Blob([pdf], { type: "application/zip" });
    saveAs(blob, "Looking Glass");
  };
  return (
    <div className="flex flex-col md:w-[92%] w-full md:px-[100px] md:py-[50px] px-[20px] py-[30px] mx-auto bg-transparent">
      <div className="mx-auto mt-[20px] foreground">
        <div className="ml-[15%] mt-[15%]">
          <div className="grid grid-cols-8 grid-flow-col gap-[10px]">
            {nfts.map((token) => (
              <NFTCard key={token.name} nft={token} flag={false} />
            ))}
          </div>
          {nfts.length !== 0 && (
            <Link to="/collection" className="max-w-max">
              <button className="bg-black text-[#F2F2F2] md:text-[14px] text-[12px] md:rounded-[70px] rounded-[20px] md:px-[30px] md:py-[20px] px-[15px] py-[10px] cursor-pointer hover:bg-white/10 duration-100 border-2 border-[#252525] mb-[40px]">
                My Collections...
              </button>
            </Link>
          )}
        </div>
      </div>
      {nfts.length === 0 && (
        <div className="mx-auto mt-[20px] foreground1">
          <div className="mt-[15%] flex flex-row justify-center">
            <div>
              <img src={pdfImage} alt="pdf" width={100} height={150} />
              <div className="text-center">
                Looking Glass #1 <br /> (20MB PDF)
              </div>
            </div>
            <div className="ml-[100px]">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="focus:border focus:border-[#84dd1f] hover:border hover:border-[#828282] border border-[#333333] w-[100%] h-[54px] bg-black font-['Poppins'] text-[16px] leading-[30px] mt-[20px] pl-[25px] py-[0px] inline"
                  value={password}
                  placeholder=""
                ></input>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center mt-[20px]">
                  {showPassword ? (
                    <AiFillEyeInvisible
                      onClick={() => setShowPassword(!showPassword)}
                      size={35}
                    >
                      {showPassword ? "hide" : "show"}
                    </AiFillEyeInvisible>
                  ) : (
                    <AiFillEye
                      onClick={() => setShowPassword(!showPassword)}
                      size={35}
                    >
                      {showPassword ? "hide" : "show"}
                    </AiFillEye>
                  )}
                </div>
              </div>
              <div className="text-center">
                <button
                  className="bg-[#1a7e11] text-[#F2F2F2] md:text-[20px] mt-[20px] text-[14px] rounded-[10px] px-[15px] py-[10px] cursor-pointer hover:bg-[#84dd1f] duration-100 border-1 border-[#252525] mb-[40px]"
                  onClick={download}
                >
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
