import axios from "axios";
import NFTCardClaim from "components/NFTCardClaim";
import Container from "components/Shared/Container";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
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
} from "../../utils/api.contant";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

// const account = "0x6FBb4B4Fa983B223bceEfC4AEbD543BB94745cF9";
const Home = () => {
  const { account } = useWeb3React();
  const [nfts, setNFTs] = useState([]);
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
    setNFTs(itemArray.slice(0, itemArray.length > 5 ? 5 : itemArray.length));
    setIsLoading(true);
  };

  useEffect(() => {
    fetchCollection();
  }, [account]);

  const download = async () => {
    const filePath = "https://nxc-public.s3.amazonaws.com/LookingGlass.pdf";
    var link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf("/") + 1);
    link.click();
  };
  return (
    <Container className="pt-[8px]">
      <div className="flex flex-row items-center justify-between md:mb-[8px] mb-[8px] ">
        <h2 className="font-normal md:text-[42px] text-[20px] font-[NSimSun]">
          Comics collection
        </h2>
        <Link to="/collection">
          <button className="round-[4px] border-[1px] hover:outline-1 hover:outline-white hover:outline border-white md:px-[18px] px-[12px] md:py-[9px] py-[6px] h-full md:text-[15px] text-[12px] font-medium">
            All collections
          </button>
        </Link>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex flex-row justify-between md:[&>*:not(:first-child)]:ml-[10px] [&>*:not(:first-child)]:ml-[5px] mb-8 overflow-scroll">
          {nfts.map((token) => (
            <NFTCardClaim key={token.name} nft={token} flag={false} />
          ))}
        </div>
      </div>
      {nfts.length !== 0 && (
        <div className="flex md:flex-row flex-col items-center rounded-[2rem] px-[40px] py-[24px] bg-[#1A1A1D] mb-28">
          <div className="flex flex-row items-center flex-1  md:mb-[0] mb-[8px]">
            <img
              src={pdfImg}
              alt="pdf"
              width={100}
              height={150}
              className="md:w-[89px] w-[50px] md:h-[89px] h-[50px]"
            />
            <div className="flex flex-col ml-4">
              <h6 className="font-medium md:text-[22px] text-[15px] md:mb-3 mb-2">
                Looking Glass #1
              </h6>
              <p className="text-[#757575] md:text-[15px] text-[12px] font-normal">
                (20MB PDF)
              </p>
            </div>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="text-white text-[1.5rem] font-medium p-6 md:w-[349px] w-full bg-[#09090C] md:mb-[0] mb-[10px] border-solid border-[1px] border-white border-opacity-5 rounded-[6px]  "
              value={PDF_PASSWORD}
              placeholder=""
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
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
          <button
            onClick={download}
            className="flex flex-row items-center px-[24px] py-[14px] bg-[#3417FF] rounded-[6px] ml-6"
          >
            <img
              src={downloadVector}
              className="mr-[1.2rem] object-contain shrink-0 w-[1.2rem] font-medium text-[15px] text-white"
              alt=""
            />
            Download PDF
          </button>
        </div>
      )}
      {/* <div className="mt-[20px] foreground">
        <div className="ml-[15%] mt-[15%]">
          <div className="grid grid-cols-8 grid-flow-col gap-[15px]">
            {nfts.map((token) => (
              <NFTCardClaim key={token.name} nft={token} flag={false} />
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
      {nfts.length !== 0 && (
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
                  className="focus:border focus:border-[#84dd1f] hover:border hover:border-[#828282] border border-[#333333] w-[100%] md:w-[300px] h-[54px] bg-black font-['Poppins'] text-[16px] leading-[30px] mt-[20px] pl-[25px] py-[0px] inline"
                  value={PDF_PASSWORD}
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
      )} */}
    </Container>
  );
};
export default Home;
