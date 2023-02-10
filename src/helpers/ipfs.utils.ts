// @ts-ignore
import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
import { NFT_STORAGE_KEY } from "./constants";

export const pinToIpfs = async (json: any) => {
  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return await nftstorage.store(json);
};

export const replaceIpfsProtocol = (ipfsLink: string) => {
  try {
    return ipfsLink.replace("ipfs://", "https://nftstorage.link/ipfs/");
  } catch {
    return "";
  }
};
