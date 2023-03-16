import { toast } from "react-toastify";
import { getSignerFunc } from "./getSignerFunc";

export const setSignerToAdmin = async () => {
  try {
    const { signer, signedContract } = await getSignerFunc();
    const address = signer.getAddress();
    const tx = await signedContract.makeAdmin(address);
    await tx.wait();
  } catch (e) {
    console.error(e);
    toast.error("Проблемы с блокчейном...");
  }
};
