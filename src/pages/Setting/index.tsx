import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";
import { API_KEY, GOOGLE_API_KEY } from "../../utils/api.contant";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Setting = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [addressHeap, setAddressHeap] = useState([]);
  const [interAddHeap, setInterAddHeap] = useState([]);
  const [signature, setSignature] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [error, setError] = useState("");

  const { library, account } = useWeb3React();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (account) {
          axios
            .get(`${API_KEY}/address/${account}`)
            .then(function (response) {
              if (response.data.targetAddress?.shipAddress) setIsChecked(true);
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

  const convertPart = (str: string) => {
    switch (str) {
      case "postal_code":
        return "Zip Code";
      case "administrative_area_level_3":
        return "Township";
      case "administrative_area_level_2":
        return "County";
      case "administrative_area_level_1":
        return "State";
      case "locality":
        return "City";
      case "country":
        return "Country";
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [shippingAddress, account],
      });
      setSignedMessage(shippingAddress);
      setSignature(signature);
      console.log(signature);
      axios
        .post(`${API_KEY}/address`, {
          wallet: account,
          signature: signature,
          shipAddress: shippingAddress,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      setError(error);
    }
  };

  const updateMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [shippingAddress, account],
      });
      setSignedMessage(shippingAddress);
      setSignature(signature);
      console.log(signature);
      axios
        .put(`${API_KEY}/address/${account}`, {
          wallet: account,
          signature: signature,
          shipAddress: shippingAddress,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex flex-col md:w-[92%] w-full md:px-[100px] md:py-[50px] px-[20px] py-[30px] mx-auto bg-transparent">
      <div className="bg-black border gap-[30px] text-[#F2F2F2] border-[#252525] mx-auto md:m-0 md:w-[80%] fit w-[80%] rounded-[30px] px-[30px] py-[40px]">
        <div className="font-['Ailerons'] text-[31px] leading-[34px] mb-[10px] text-center">
          Shipping Address
        </div>
        <Tabs className="text-center text-gray-400 bg-transparent">
          <TabList>
            <Tab>Domestic US</Tab>
            <Tab>International</Tab>
          </TabList>
          <TabPanel className="ml-[50px]">
            <div className="App">
              <Autocomplete
                style={{
                  width: "80%",
                  marginTop: "20px",
                }}
                apiKey={GOOGLE_API_KEY}
                onPlaceSelected={(place) => {
                  console.log("place", place);
                  setAddressHeap(place.address_components);
                  setShippingAddress(place?.formatted_address);
                }}
                options={{
                  componentRestrictions: { country: "us" },
                  types: ["(regions)"],
                }}
              />
            </div>
            <div>
              {addressHeap?.map((element, index) => {
                return (
                  <div className="grid grid-cols-10 mt-[10px]">
                    <div className="col-sapn-3 whitespace-nowrap mt-[10px] flex justify-end">
                      {convertPart(element.types[0])} :
                    </div>
                    <div className="col-span-7">
                      <input
                        type="text"
                        value={element?.long_name}
                        className="focus:border hover:border hover:border-[#828282] border border-[#333333] w-[80%] bg-black font-['Poppins'] text-[16px] leading-[29px] pl-[25px]"
                        placeholder=""
                      ></input>
                      <br />
                    </div>
                  </div>
                );
              })}
            </div>
            {isChecked ? (
              <div
                onClick={updateMessage}
                className="mx-auto cursor-pointer mt-[20px] w-[139px] font-['Ailerons'] text-[20px] leading-[30px] text-center border-2 border-[#252525] rounded-[70px] py-[10px] bg-black hover:bg-[#10CD00] hover:text-black"
              >
                UPDATE
              </div>
            ) : (
              <div
                onClick={signMessage}
                className="mx-auto cursor-pointer mt-[20px] w-[139px] font-['Ailerons'] text-[20px] leading-[30px] text-center border-2 border-[#252525] rounded-[70px] py-[10px] bg-black hover:bg-[#10CD00] hover:text-black"
              >
                SAVE
              </div>
            )}
          </TabPanel>
          <TabPanel className="ml-[50px]">
            <div className="App">
              <Autocomplete
                style={{ width: "80%", marginTop: "20px" }}
                apiKey={GOOGLE_API_KEY}
                onPlaceSelected={(place) => {
                  console.log("place", place);
                  setInterAddHeap(place.address_components);
                  setShippingAddress(place?.formatted_address);
                }}
                options={{
                  types: ["(regions)"],
                }}
              />
            </div>
            <div>
              {interAddHeap?.map((element, index) => {
                return (
                  <div className="grid grid-cols-10 mt-[10px]">
                    <div className="col-sapn-3 whitespace-nowrap mt-[10px] flex justify-end">
                      {convertPart(element.types[0])} :
                    </div>
                    <div className="col-span-7">
                      <input
                        type="text"
                        value={element?.long_name}
                        className="focus:border hover:border hover:border-[#828282] border border-[#333333] w-[80%] bg-black font-['Poppins'] text-[16px] leading-[29px] pl-[25px]"
                        placeholder=""
                      ></input>
                      <br />
                    </div>
                  </div>
                );
              })}
            </div>
            {isChecked ? (
              <div
                onClick={updateMessage}
                className="mx-auto cursor-pointer mt-[20px] w-[139px] font-['Ailerons'] text-[20px] leading-[30px] text-center border-2 border-[#252525] rounded-[70px] py-[10px] bg-black hover:bg-[#10CD00] hover:text-black"
              >
                UPDATE
              </div>
            ) : (
              <div
                onClick={signMessage}
                className="mx-auto cursor-pointer mt-[20px] w-[139px] font-['Ailerons'] text-[20px] leading-[30px] text-center border-2 border-[#252525] rounded-[70px] py-[10px] bg-black hover:bg-[#10CD00] hover:text-black"
              >
                SAVE
              </div>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
export default Setting;
