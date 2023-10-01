import Container from "components/Shared/Container";
import { useEffect, useState } from "react";
import { debounce } from 'lodash';

const Faq = () => {
    const [openItem, setOpenItem] = useState(null);

    const handleItemClick = (index) => {
        setOpenItem(index);
    }

    const debouncedHandleItemClick = debounce(handleItemClick, 200);

    return (
        <Container className="pt-[108px] px-auto">
            <div className="w-[60%] mx-auto">
                <details
                    className="border-2 border-[#252525] rounded-[10px] pt-5 pb-5 px-5 relative mb-1 bg-black  duration-500 mb-[12px]"
                    open={openItem === 0}
                    onClick={() => debouncedHandleItemClick(0)}
                >
                    <summary
                        className="list-none font-semibold relative text-[20px] cursor-pointer pr-7 transition-colors duration-200 text-[#959595] hover:text-white hover:underline focus:outline-none"
                    >
                        How to set and check your profile information?
                        <div className="absolute top-1 right-0 bg-[#252525] hover:bg-slate rounded-full px-1 py-0.5 cursor-pointer visible">
                            <svg
                                className="h-10 w-8 text-pink-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </summary>
                    <p className="pt-3 transition-opacity duration-500 text-[16px] pl-[20px] text-[#959595] hover:text-white">
                        1. Click on the "Settings" item in the drop-down menu of the "Connect Wallet" button to visit the settings page.<br></br>
                        2. Fill out all the required fields in the settings page and validate the information.<br></br>
                        3. Save all the settings and check your wallet sign in your wallet to ensure that the information has been saved correctly.<br></br>
                        4. Once you have saved your settings, you can view your information in your profile page.<br></br>
                    </p>
                </details>
                <details
                    className={`border-2 border-[#252525] rounded-[10px] pt-5 pb-5 px-5 relative mb-1 bg-black  duration-500 mb-[12px]`}
                    open={openItem === 1}
                    onClick={() => debouncedHandleItemClick(1)}
                >
                    <summary
                        className="list-none font-semibold relative text-[20px] cursor-pointer pr-7 transition-colors duration-200 text-[#959595] hover:text-white hover:underline focus:outline-none"
                    >
                        How to claim your NFT to get comic book?
                        <div className="absolute top-1 right-0 bg-[#252525] hover:bg-slate rounded-full px-1 py-0.5 cursor-pointer visible">
                            <svg
                                className="h-10 w-8 text-pink-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </summary>
                    <p className="pt-3 transition-opacity duration-500 text-[16px] pl-[20px] text-[#959595] hover:text-white">
                        1. Visit the Collection or Home page and check if there are any NFT cards that do not have a "claimed" badge.<br></br>
                        2. Click on the NFT card and sign in to your wallet.<br></br>
                        3. Your shipping address will be stored in our delivery team database.<br></br>
                        4. Finally, you will receive your comic book soon.<br></br>
                    </p>
                </details>
                <details
                    className={`border-2 border-[#252525] rounded-[10px] pt-5 pb-5 px-5 relative mb-1 bg-black  duration-500 mb-[12px]`}
                    open={openItem === 2}
                    onClick={() => debouncedHandleItemClick(2)}
                >
                    <summary
                        className="list-none font-semibold relative text-[20px] cursor-pointer pr-7 transition-colors duration-200 text-[#959595] hover:text-white hover:underline focus:outline-none"
                    >
                        If your address is international, not US-domain, validate function always works fine?
                        <div className="absolute top-1 right-0 bg-[#252525] hover:bg-slate rounded-full px-1 py-0.5 cursor-pointer visible">
                            <svg
                                className="h-10 w-8 text-pink-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </summary>
                    <p className="pt-3 transition-opacity duration-500 text-[16px] pl-[20px] text-[#959595] hover:text-white">
                        In general, International Address Validator works but in rare cases, this Google API doesn't support some areas.<br></br>
                        In these cases, you can contact <a href="https://discord.com/users/vadym5623" className="text-[#B58841] hover:underline hover:text-[#B58841]">Vadym</a> the developer on Discord
                    </p>
                </details>
            </div>
        </Container >
    );
};
export default Faq;
