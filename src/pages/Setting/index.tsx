import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";
import { API_KEY, GOOGLE_KEY } from "../../utils/api.contant";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const address = "2566 Shallowford Rd NE Atlanta, GA 30345";

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
    validateAddress(address).then((res) => {
      console.log(res);
    });
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

  async function validateAddress1(address) {
    const response = await axios.get(
      `https://api.smartystreets.com/street-address?auth-id=YOUR_AUTH_ID&auth-token=YOUR_AUTH_TOKEN&street=${address}`
    );
    const data = response.data;

    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async function validateAddress(address) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_KEY}`
    );
    const data = response.data;

    if (data.status === "OK") {
      console.log("data.result", data.results);
      for (const result of data.results) {
        if (result.formatted_address.includes(address)) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
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
            <div className="App"></div>
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
            <div className="App"></div>
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
