import { BrowserProvider, Contract } from "ethers";
import { toast } from "react-toastify";
import { abi, StorageAddress } from "./addressAndAbi";

export const getSignerFunc = async () => {
  try {
    //@ts-ignore
    const walletProvider = new BrowserProvider(window.ethereum);
    const signer = await walletProvider.getSigner();
    const signedContract = new Contract(StorageAddress, abi, signer);
    return { signer, signedContract };
  } catch (e) {
    toast.error("Не удалось подключить метамаск...");
  }
};
