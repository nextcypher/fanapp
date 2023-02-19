import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { truncateAddress } from "../../components/Connect/utils";
import axios from "axios";
import { API_KEY } from "../../utils/api.contant";
import { FaUserAlt } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";

const Profile = () => {
  const { library, account } = useWeb3React();
  const [shipAddress, setShipAddress] = useState("");
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
  return (
    <div className="flex flex-col md:w-[92%] w-full md:px-[100px] md:py-[50px] px-[20px] py-[30px] mx-auto bg-transparent">
      {account ? (
        <div>
          <div>
            <FaUserAlt color="gray" size={50} className="inline mr-[20px]" />
            <span className="font-['Ailerons'] text-[30px] pt-[10px]">
              Unnamed
            </span>
          </div>
          <div className="mt-[20px] mb-[20px] ml-[10px]">
            <FaEthereum size={25} color="gray" className="inline mr-[20px]" />
            <span className="text-[16px] mt-[10px] mr-[20px] underline">
              {truncateAddress(account)}
            </span>
            <span className="text-gray-400">Joined Febrary 2023</span>
          </div>
          <div className="bg-black border gap-[30px] text-[#F2F2F2] border-[#252525] mx-auto md:m-0 md:w-[800px] fit w-[80%] rounded-[30px] px-[30px] py-[40px]">
            <div className="font-['Ailerons'] text-[31px] leading-[34px] mt-[10px]">
              Shipping Address
            </div>
            {shipAddress ? (
              <div className="text-[16px] leading-[29px] italic">
                {shipAddress}
              </div>
            ) : (
              <div className="text-[16px] leading-[29px]">
                <p className="italic">You didn't set shipping address yet.</p>
                <Link to="/setting">
                  <div className="mx-auto cursor-pointer mt-[20px] w-[139px] font-['Ailerons'] text-[20px] leading-[30px] text-center border-2 border-[#252525] rounded-[70px] py-[10px] bg-black hover:bg-[#10CD00] hover:text-black">
                    SETTING
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>No Account</div>
      )}
    </div>
  );
};
export default Profile;
