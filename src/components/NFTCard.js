import React from "react";

const NFTCard = ({ nft }) => {
  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg">
      <img src={nft.image} alt="" className="w-full" />
      <div className="px-4 py-4">
        <div className="font-bold text-teal-600 text-xl mb-2">{nft.name}</div>
      </div>
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
        <div></div>
      </div>
    </div>
  );
};

export default NFTCard;
