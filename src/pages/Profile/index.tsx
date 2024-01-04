import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { truncateAddress } from "../../components/Connect/utils";
import axios from "axios";
import { API_KEY } from "../../utils/api.contant";
import { FaUserAlt } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import styled from "styled-components";

import profileHeader from "../../assets/images/background/profile-header.png";
import profileAvatar from "../../assets/images/img/avatar.png";
import ethIcon from "../../assets/images/img/Ethereum.svg";
import nameIcon from "../../assets/images/img/name.svg";
import phoneIcon from "../../assets/images/img/phone.svg";
import addressIcon from "../../assets/images/img/address.svg";

const StyledPhoneInput = styled(PhoneInput)`
  &:hover {
    background-color: black;
  }
`;

const Profile = () => {
  const { account } = useWeb3React();
  const [shipAddress, setShipAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (account) {
          axios
            .get(`${API_KEY}/address/${account}`)
            .then(function (response) {
              setShipAddress(response.data.data.shipAddress);
              setName(response.data.data.name);
              setPhone(response.data.data.phone);
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
    <div className="flex flex-col md:w-[92%] w-full md:px-[100px] md:pt-[50px] px-[20px] pt-[30px] mx-auto bg-transparent">
      {account ? (
        // <div>
        //   <div>
        //     <FaUserAlt color="gray" size={50} className="inline mr-[20px]" />
        //     <span className="font-['Ailerons'] text-[30px] pt-[10px]">
        //       {
        //         name ? name : "UNNAMED"
        //       }
        //     </span>
        //   </div>
        //   <div className="mt-[20px] mb-[20px] ml-[10px]">
        //     <FaEthereum size={25} color="gray" className="inline mr-[20px]" />
        //     <span className="text-[16px] mt-[10px] mr-[20px] underline">
        //       {truncateAddress(account)}
        //     </span>
        //   </div>
        //   <div className="bg-black border gap-[30px] text-[#F2F2F2] border-[#252525] mx-auto md:m-0 md:w-[800px] fit w-[80%] rounded-[30px] px-[30px] py-[40px]">

        //     {
        //       phone ? (
        //         <div>
        //           <div className="font-['Ailerons'] text-[31px] leading-[34px] mt-[10px]">
        //             Phone Number
        //           </div>
        //           <div className="text-[16px] leading-[29px] italic">
        //             {phone}
        //           </div>
        //         </div>
        //       ) : (
        //         <div></div>
        //       )
        //     }
        //     {shipAddress ? (
        //       <div>
        //         <div className="font-['Ailerons'] text-[31px] leading-[34px] mt-[10px]">
        //           Shipping Address
        //         </div>
        //         <div className="text-[16px] leading-[29px] italic">
        //           {shipAddress}
        //         </div>
        //       </div>
        //     ) : (
        //       <div className="text-[16px] leading-[29px]">
        //         <p className="italic">You didn't set phone number and shipping address yet.</p>
        //         <Link to="/setting">
        //           <div className="mx-auto cursor-pointer mt-[20px] w-[139px] font-['Ailerons'] text-[20px] leading-[30px] text-center border-2 border-[#252525] rounded-[70px] py-[10px] bg-black hover:bg-[#10CD00] hover:text-black">
        //             SETTING
        //           </div>
        //         </Link>
        //       </div>
        //     )}
        //   </div>
        // </div>
        <div className="flex flex-col w-full">
          <div className="w-full h-[170px] relative">
            <img src={profileHeader} alt="" className="w-full h-full rounded-xl" />
            <div className="w-full h-full absolute left-0 top-0 bg-[#140D46C7] rounded-xl">
            </div>
            <div className="w-[120px] h-[120px] rounded-full absolute left-[20px] -bottom-[60px]">
              <img src={profileAvatar} alt="" className="w-full h-full" />
            </div>
          </div>
          <div className="mb-12">
            <div className="h-[60px] flex items-center ml-[160px]">
              <img src={ethIcon} alt="" className="w-[16px] h-[16px] mr-2" />
              <p className="text-[16px]">0x7445...ce33</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex w-1/2 mb-10">
                <img src={nameIcon} alt="" className="w-[45px] h-[45px] mr-5" />
                <div className="">
                  <label className="text-[18px]">Name</label>
                  <p className="text-[24px]">{name ? name : "UNNAMED"}</p>
                </div>
              </div>
              {
                phone ? (
                  <div className="flex w-1/2 mb-10">
                    <img src={phoneIcon} alt="" className="w-[45px] h-[45px] mr-5" />
                    <div className="">
                      <label className="text-[18px]">Phone Number</label>
                      <StyledPhoneInput
                        country={'us'}
                        placeholder="(+1)"
                        value={phone}
                        disabled
                        containerStyle={{
                          border: "solid 0px #333333",
                          width: "100%",
                          margin: "auto",
                        }}
                        inputStyle={{
                          color: "white",
                          background: "transparent",
                          border: "solid 0px #333333",
                          fontSize: "24px",
                          height: "48px",
                          width: "100%"
                        }}
                        buttonStyle={{
                          background: "transparent",
                          border: "solid 0px",
                          borderRight: "solid 0px #333333",
                        }}
                        dropdownStyle={{
                          background: "black",
                        }}
                      />
                    </div>
                  </div>
                ) : ""
              }
            </div>

            {
              shipAddress ? (
                <div className="flex mb-10">
                  <img src={addressIcon} alt="" className="w-[45px] h-[45px] mr-5" />
                  <div className="">
                    <label className="text-[18px]">Shipping Address</label>
                    <p className="text-[24px]">{shipAddress}</p>
                  </div>
                </div>
              ) : ""
            }
          </div>
        </div>
      ) : (
        <div>No Account</div>
      )}
    </div>
  );
};
export default Profile;
