import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { INFT } from "types/nft";
import { API_KEY } from "../utils/api.contant";

interface Props {
  nft: INFT;
  flag: boolean;
}

const NFTCardClaim: FunctionComponent<Props> = ({ nft, flag = true }) => {
  const [claimed, setClaimed] = useState(false);
  const { library, account } = useWeb3React();
  const [shipAddress, setShipAddress] = useState("");
  const nftIndex = nft.edition;
  const [signature, setSignature] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [axiosResponse, setAxiosResponse] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${API_KEY}/nft/${nft.edition}`)
        .then(function (response) {
          console.log("response", response);
          if (response.data.data) setClaimed(true);
          else setClaimed(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, [signature, axiosResponse]);

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

  function convert(num) {
    switch (num.toString().length) {
      case 1:
        return `000${num}`;
      case 2:
        return `00${num}`;
      case 3:
        return `0${num}`;
      case 4:
        return num;
      default:
        return "0000";
    }
  }

  const signMessage = async () => {
    const date = new Date();
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [
          "NFT index: " +
            nftIndex.toString() +
            "\n" +
            "Shipping Address: " +
            shipAddress +
            "\n" +
            "Date: " +
            date.toDateString(),
          account,
        ],
      });

      setSignedMessage("ok");
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
          setAxiosResponse(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div
      onClick={claimed ? undefined : signMessage}
      className={`flex flex-col md:w-[210px] w-[130px] md:p-[1.6rem] p-[0.8rem] items-center justify-center border-[1px] border-[#3417FF] rounded-[0.8rem] backdrop-blur-[3.6px] z-0 ${
        claimed ? "" : "cursor-pointer"
      }`}
    >
      <img
        className="w-full md:h-[240px] h-[200px] mb-5 rounded-md object-cover"
        src={`https://nxc-public.s3.amazonaws.com/tn/${convert(
          nft.edition
        )}.jpg`}
        alt=""
        // alt={title}
      />
      <div className="w-full flex flex-row items-center justify-between">
        <h5 className="font-[Outfit] md:text-[18px] text-[13px] font-[400] line-[23px] text-ellipsis overflow-hidden whitespace-nowrap">
          {nft.name}
        </h5>
        {claimed && (
          <p className="capitalize text-[#1B1A1F] rounded-[20px] bg-[#00FF66] py-[2px] px-[5px] line[13px] text-[Outfit] md:text-[10px] text-[9px]">
            claimed
          </p>
        )}
      </div>
    </div>
  );
};

export default NFTCardClaim;
