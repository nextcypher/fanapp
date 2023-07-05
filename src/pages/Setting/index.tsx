import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { CountryDropdown } from "react-country-region-selector";
import axios from "axios";
import { API_KEY } from "../../utils/api.contant";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";

const StyledPhoneInput = styled(PhoneInput)`
  &:hover {
    background-color: black;
  }
`;

const Setting = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputAddress, setInputAddress] = useState("");
  const [ValidatedAddress, setValidatedAddress] = useState([]);
  const [formatedAddress, setFormatedAddress] = useState("");
  const [country, setCountry] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signature, setSignature] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [error, setError] = useState("");

  const { library, account } = useWeb3React();

  useEffect(() => {
    setValidatedAddress([]);
    setFormatedAddress("");
    getGeoInfo();
  }, [tabIndex]);
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

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [formatedAddress, account],
      });
      setSignedMessage(formatedAddress);
      setSignature(signature);
      console.log(signature);
      axios
        .post(`${API_KEY}/address`, {
          wallet: account,
          signature: signature,
          shipAddress: formatedAddress,
          name: firstName + " " + lastName,
          phone: phone,
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

  const convertPart = (str: string) => {
    switch (str) {
      case "postal_code":
        return "Zip Code";
      case "street_number":
        return "street_number";
      case "route":
        return "street 1";
      case "subpremise":
        return "street 2";
      case "point_of_interest":
        return "point_of_interest";
      case "postal_code_suffix":
        return "Zip Code Suffix";
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

  const updateMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [formatedAddress, account],
      });
      setSignedMessage(formatedAddress);
      setSignature(signature);
      console.log(signature);
      axios
        .put(`${API_KEY}/address/${account}`, {
          wallet: account,
          signature: signature,
          shipAddress: formatedAddress,
          name: firstName + " " + lastName,
          phone: phone,
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

  const ValidateUS = async () => {
    const response = await axios.post(`${API_KEY}/validate`, {
      addressLines: inputAddress,
      regionCode: "US",
    });
    setValidatedAddress(response.data.address.addressComponents);
    setFormatedAddress(response.data.address.formattedAddress);
  };

  const ValidateGlobal = async () => {
    const response = await axios.post(`${API_KEY}/validate`, {
      addressLines: inputAddress,
      regionCode: countryCode,
    });
    setValidatedAddress(response.data.address.addressComponents);
    setFormatedAddress(response.data.address.formattedAddress);
  };

  const selectCountry = async (val) => {
    setCountry(val);
    setCountryCode(await getCountryCode(val));
  };

  async function getCountryCode(country) {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/name/${country}?fullText=true`
      );
      return response.data[0].alpha2Code;
    } catch (error) {
      console.error(error);
    }
  }

  const getGeoInfo = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    setCountry(res.data.country_name);
  };

  return (
    <div className="flex flex-col md:w-[92%] w-full md:px-[100px] md:py-[50px] px-[20px] py-[30px] mx-auto bg-transparent">
      <div className="bg-black border gap-[30px] text-[#F2F2F2] border-[#252525] mx-auto md:m-0 md:w-[80%] fit w-[90%] rounded-[30px] px-[30px] py-[40px]">
        <div>
          <div className="font-['Ailerons'] text-[31px] leading-[34px] my-[10px] text-center">
            Your name
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <input
                type="text"
                id="first_name"
                className="focus:border focus:border-[#10CD00] hover:border hover:border-[#828282] border border-[#333333] md:w-[100%] w-[100%] h-[54px] bg-black font-['Poppins'] text-[16px] leading-[30px] mt-[5px] pl-[25px] py-[0px]"
                placeholder="First Name"
                onChange={(e)=>{setFirstName(e.target.value)}}
              ></input>
            </div>
            <div>
              <input
                type="text"
                id="last_name"
                className="focus:border focus:border-[#10CD00] hover:border hover:border-[#828282] border border-[#333333] md:w-[100%] w-[100%] h-[54px] bg-black font-['Poppins'] text-[16px] leading-[30px] mt-[5px] pl-[25px] py-[0px]"
                placeholder="Last Name"
                onChange={(e)=>{setLastName(e.target.value)}}
              ></input>
            </div>
          </div>
        </div>
        <div>
          <div className="font-['Ailerons'] text-[31px] leading-[34px] my-[10px] text-center">
            Phone Number
          </div>
          <div className="w-full ml-[35%]">
            <StyledPhoneInput
              country={'us'}
              placeholder="(+1)"
              value={phone}
              onChange={setPhone}
              containerStyle={{
                border: "solid 0px #333333",
              }}
              inputStyle={{
                color: "white",
                background: "transparent",
                border: "solid 1px #333333",
                fontSize: "20px",
                height: "54px",
              }}
              buttonStyle={{
                background: "transparent",
                border: "solid 0px",
                borderRight: "solid 1px #333333",
              }}
              dropdownStyle={{
                background: "black",
              }}
            />
          </div>
        </div>
        <div className="font-['Ailerons'] text-[31px] leading-[34px] my-[10px] text-center">
          Shipping Address
        </div>
        <Tabs
          className="text-center text-gray-400 bg-transparent"
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList>
            <Tab>Domestic US</Tab>
            <Tab>International</Tab>
          </TabList>
          <TabPanel className="">
            <div className="App flex flex-col md:flex-row justify-between items-center">
              <input
                type="text"
                onChange={(e) => setInputAddress(e.target.value)}
                className="focus:border focus:border-[#10CD00] hover:border hover:border-[#828282] border border-[#333333] md:w-[60%] w-[100%] h-[54px] bg-black font-['Poppins'] text-[16px] leading-[30px] mt-[20px] pl-[25px] py-[0px]"
                placeholder=""
              ></input>
              <div
                onClick={ValidateUS}
                className="cursor-pointer mt-[20px] w-[139px] font-['Ailerons'] text-[20px] leading-[30px] text-center border-2 border-[#252525] rounded-[10px] py-[10px] bg-black hover:bg-[#10CD00] hover:text-black"
              >
                Validate
              </div>
            </div>
            {ValidatedAddress?.map((element, index) => (
              <div className="grid grid-cols-10 mt-[10px]">
                <div className="col-sapn-3 whitespace-nowrap mt-[10px] flex justify-end">
                  {convertPart(element.componentType)} :
                </div>
                <div className="col-span-7">
                  <input
                    type="text"
                    value={element?.componentName?.text}
                    className="focus:border hover:border hover:border-[#828282] border border-[#333333] w-[80%] bg-black font-['Poppins'] text-[16px] leading-[29px] pl-[25px]"
                    placeholder=""
                  ></input>
                  <br />
                </div>
              </div>
            ))}
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
          <TabPanel className="">
            <div className="App flex flex-col md:flex-row justify-between items-center">
              <input
                type="text"
                onChange={(e) => setInputAddress(e.target.value)}
                className="focus:border focus:border-[#10CD00] hover:border hover:border-[#828282] border border-[#333333] md:w-[60%] w-[100%] h-[54px] bg-black font-['Poppins'] text-[16px] leading-[30px] mt-[20px] pl-[25px] py-[0px]"
                placeholder=""
              ></input>
              <div className="mx-[10px] md:w-[30%] w-[100%]">
                <CountryDropdown
                  value={country}
                  onChange={(val) => selectCountry(val)}
                  defaultOptionLabel={country}
                  classes="w-[60%] mt-[20px] h-[54px] bg-black"
                />
              </div>
              <div
                onClick={ValidateGlobal}
                className="mx-auto cursor-pointer mt-[20px] w-[139px] font-['Ailerons'] text-[20px] leading-[30px] text-center border-2 border-[#252525] rounded-[10px] py-[10px] bg-black hover:bg-[#10CD00] hover:text-black"
              >
                Validate
              </div>
            </div>
            {ValidatedAddress?.map((element, index) => (
              <div className="grid grid-cols-10 mt-[10px]">
                <div className="col-sapn-3 whitespace-nowrap mt-[10px] flex justify-end">
                  {convertPart(element.componentType)} :
                </div>
                <div className="col-span-7">
                  <input
                    type="text"
                    value={element?.componentName?.text}
                    className="focus:border hover:border hover:border-[#828282] border border-[#333333] w-[80%] bg-black font-['Poppins'] text-[16px] leading-[29px] pl-[25px]"
                    placeholder=""
                  ></input>
                  <br />
                </div>
              </div>
            ))}
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
