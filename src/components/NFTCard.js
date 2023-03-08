import React from "react";

const NFTCard = ({ nft, flag = true }) => {
  function convert(num) {
    switch (num.toString().length) {
      case 1: return `000${num}`
      case 2: return `00${num}`
      case 3: return `0${num}`
      case 4: return num
      default: return "0000"
    }
  }
  return (
    // <div className="max-w-lg rounded overflow-hidden shadow-lg">
    //   <img src={`https://nxc-public.s3.amazonaws.com/tn/${convert(nft.edition)}.jpg`} alt="" className="w-full" />
    //   {flag && (
    //     <div className="px-4 py-4">
    //       <div className="font-bold text-teal-600 text-xl mb-2">{nft.name}</div>
    //     </div>
    //   )}

    //   <div className="px-6 py-4">
    //     {nft.traits?.map((trait, index) => (
    //       <span
    //         key={index}
    //         className="inline-block bg-gray-200
    //              rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2"
    //       >
    //         {trait["trait_type"]}:{trait.value}
    //       </span>
    //     ))}
    //     <div></div>
    //   </div>
    // </div>
    <div
      className="flex flex-col md:w-[210px] w-[130px] md:p-[1.6rem] p-[0.8rem] items-center justify-center border-[1px] border-[#3417FF] rounded-[0.8rem] backdrop-blur-[3.6px] z-0"
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
        <p className="capitalize text-[#1B1A1F] rounded-[20px] bg-[#00FF66] py-[2px] px-[5px] line[13px] text-[Outfit] md:text-[10px] text-[9px]">
          {nft.edition}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
