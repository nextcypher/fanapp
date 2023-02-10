import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import slide1 from '../../assets/images/looking_bg-1.jpg'
import slide2 from '../../assets/images/slider_bg-2.jpg'

const Home = () => {
  const {
    library,
    account,
  } = useWeb3React();

  const [sliderRef] = useKeenSlider({
    loop: {
      min: -5,
      max: 5,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (account) {
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  });
  return (
    <div className="flex flex-col md:w-[92%] w-full md:px-[100px] md:py-[50px] px-[20px] py-[30px] mx-auto bg-transparent">
      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide number-slide1">
          <img src={slide1} />
          <p>Looking Glass</p>
        </div>
        <div className="keen-slider__slide number-slide2">
        <img src={slide2} />
        </div>
      </div>
    </div>
  );
};
export default Home;
