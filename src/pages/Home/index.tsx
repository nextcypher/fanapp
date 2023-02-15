import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { useKeenSlider } from "keen-slider/react";
import { Link } from "react-router-dom";
import {
  baseURL,
  CONTRACT_ADDRESS,
  ALCHEMY_API_KEY,
} from "../../utils/api.contant";
import NFTCard from "../../components/NFTCard";
import "keen-slider/keen-slider.min.css";
import slide1 from "../../assets/images/looking_bg-1.jpg";
import slide2 from "../../assets/images/slider_bg-2.jpg";

// const account = "0x6FBb4B4Fa983B223bceEfC4AEbD543BB94745cF9";
const Home = () => {
  const { account } = useWeb3React();
  const [nfts, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  return (
    <div className="flex flex-col md:w-[92%] w-full md:px-[100px] md:py-[50px] px-[20px] py-[30px] mx-auto bg-transparent">
      <div className="container mx-auto mt-[20px]">
        {!isLoading && nfts.length === 0 && (
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide number-slide1">
              <img src={slide1} alt="slide1" />
              <p>Looking Glass</p>
            </div>
            <div className="keen-slider__slide number-slide2">
              <img src={slide2} alt="slide2" />
            </div>
          </div>
        )}
        <Link to="/collection" className="max-w-max">
          <button className="bg-black text-[#F2F2F2] text-[18px] w-[200px] rounded-[70px] px-[30px] py-[20px] cursor-pointer hover:bg-white/10 duration-100 border-2 border-[#252525]">
            My Collections...
          </button>
        </Link>
        <div className="grid grid-cols-4 gap-4">
          {nfts.map((token) => (
            <NFTCard key={token.name} nft={token} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
