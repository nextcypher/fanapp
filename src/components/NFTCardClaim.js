import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { BsCheckLg } from "react-icons/bs";
import axios from "axios";
import {
  API_KEY,
} from "../utils/api.contant";
const NFTCardClaim = ({ nft, flag = true }) => {
  const [claimed, setClaimed] = useState(false);
  const { library, account } = useWeb3React();
  const [shipAddress, setShipAddress] = useState("");
  const nftIndex = nft.edition;
  const [signature, setSignature] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${API_KEY}/nft/${nft.edition}`)
        .then(function (response) {
          console.log("response", response);
          if (response.data.data) setClaimed(true)
          else setClaimed(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchData();
  }, [signature]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (account) {
          axios
            .get(`${API_KEY}/address/${account}`)
            .then(function (response) {
              setShipAddress(response.data.data.shipAddress);
              console.log(response);
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
  });

  const signMessage = async () => {
    const date = new Date();
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: ["NFT index: " + nftIndex.toString() + "\n" + "Shipping Address: " + shipAddress + "\n" + "Date: " + date.toDateString(), account],
      });

      setSignedMessage("ok")
      setSignature(signature);
      console.log(signature);
      axios
        .post(`${API_KEY}/nft`, {
          nftIndex: nftIndex.toString(),
          wallet: account,
          signature: signature,
          timestamp: date.toDateString(),
          shipAddress: shipAddress,
        })
        .then(function (response) {
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      setError(error);
    }
  };

  return (
    claimed ? (
      <div className="max-w-lg rounded overflow-hidden shadow-lg">

        <img src={nft.image} alt="" className="w-full" />

        <div className="px-6 py-4">
          {nft.traits?.map((trait, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200
           rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2"
            >
              {trait["trait_type"]}:{trait.value}

            </span>
          ))}
          <BsCheckLg size={40} className="mt-[-40px] ml-[20px]" color="#10CD00" />
        </div>

      </div>
    ) : (
      <div className="max-w-lg rounded overflow-hidden shadow-lg cursor-pointer" onClick={signMessage}>

        <img src={nft.image} alt="" className="w-full" />

        <div className="px-6 py-4">
          {nft.traits?.map((trait, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200
           rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2"
            >
              {trait["trait_type"]}:{trait.value}

            </span>
          ))}
        </div>

      </div>
    )

  );
};

export default NFTCardClaim;
