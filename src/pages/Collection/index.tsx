import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import {
  baseURL,
  CONTRACT_ADDRESS,
  ALCHEMY_API_KEY,
} from "../../utils/api.contant";
import NFTCard from "../../components/NFTCard";

// const account = "0x6FBb4B4Fa983B223bceEfC4AEbD543BB94745cF9";
function Collection() {
  const { library, account } = useWeb3React();
  const [nfts, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    console.log("itemArray", itemArray);
    setNFTs(itemArray);
    setIsLoading(true);
  };

  useEffect(() => {
    if (account) {
      console.log("wallet", account);
    }
  });

  useEffect(() => {
    fetchCollection();
  }, [account]);

  return (
    <div>
      <div className="container mx-auto mt-[18px]">
        {!isLoading && nfts.length === 0 && (
          <h1 className="text-5xl text-center mx-auto mt-32">
            No Collection Found
          </h1>
        )}
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
