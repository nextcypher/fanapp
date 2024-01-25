import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import {
  baseURL,
  CONTRACT_ADDRESS,
  ALCHEMY_API_KEY,
} from "../../utils/api.contant";
import NFTCard from "../../components/NFTCard";
import ProgressBar from "components/ProgressBar";

function Collection() {
  const { library, account } = useWeb3React();
  const [nfts, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchURL = `${baseURL + ALCHEMY_API_KEY}/getNFTs/?owner=${account}`;
  const options = {
    method: "GET",
    url: fetchURL,
    params: { omitMetadata: "false", contractAddresses: [CONTRACT_ADDRESS] },
    headers: { accept: "application/json" },
  };
  const fetchCollection = async () => {
    console.log(fetchURL);
    const itemArray = [];
    console.log("start");
    setIsLoading(true);
    axios
      .request(options)
      .then(function (response) {
        response?.data?.ownedNfts.map((nft) => {
          itemArray.push(nft.metadata);
        });
        setIsLoading(false);
        setNFTs(itemArray);
      })
      .catch(function (error) {
        console.error(error);
        setIsLoading(false);
      });
    // await new Promise((r) => setTimeout(r, 5000));
  };

  useEffect(() => {
    if (account) {
      console.log("wallet", account);
    }
  });

  useEffect(() => {
    if (account) {
      fetchCollection();
    }
  }, [account]);

  return (
    <div>
      <div className="container mx-auto mt-[18px]">
        {!isLoading && nfts.length === 0 && (
          <h1 className="text-5xl text-center mx-auto mt-32">
            No Collection Found
          </h1>
        )}
        {
          isLoading ?
            <div className="w-[70%] h-[50vh] m-auto flex items-center justify-center">
              <ProgressBar startFlag={isLoading} />
            </div> : ""
        }
        <div className="grid grid-cols-5 gap-4">
          {nfts.map((token) => (
            <NFTCard key={token.name} nft={token} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
