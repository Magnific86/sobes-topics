import React, { useState } from "react";
import { DarkMode } from "./DarkMode";
import { IoIosAddCircle } from "react-icons/io";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useWindowSize } from "../utils/hooks/useWindowSize";
import { useAppContext } from "../context/MyContext";
import { toast } from "react-toastify";
import { getSignerFunc } from "../utils/web3Actions/getSignerFunc";

export const MyHeader = () => {
  const {
    handleToggleDrawer,
    handleToggleModal,
    handleToggleInfoDrawer,
    handleToggleAdminPanel,
    isAdmin,
    setIsAdmin,
  } = useAppContext();
  const { width: w } = useWindowSize();
  const [signerAddress, setSignerAddress] = useState("");

  const handleCheckAdmin = async () => {
    try {
      const { signer, signedContract } = await getSignerFunc();
      setSignerAddress(String(await signer.getAddress()));
      const boolIsAdmin = await signedContract.admins(signer.getAddress());
      setIsAdmin(String(boolIsAdmin));
      boolIsAdmin ? toast.success("Велком бэк") : toast.warn("Не админ");
      console.log("boolIs admin", boolIsAdmin);
    } catch (e) {
      toast.error("Не удалось подключиться и проверить на админа");
    }
  };

  return (
    <header>
      <DarkMode />
      {isAdmin === "true" && (
        <button onClick={handleToggleDrawer}>
          {w > 768 ? (
            "Добавить пост"
          ) : (
            <IoIosAddCircle style={{ fontSize: w > 686 ? "26px" : "14px" }} />
          )}
        </button>
      )}
      <button onClick={handleToggleModal}>
        {w > 686 ? "Оставить отзыв" : "Отзыв"}
      </button>
      <button onClick={handleToggleInfoDrawer}>
        <InfoCircleOutlined style={{ fontSize: w > 686 ? "26px" : "14px" }} />
      </button>
      {isAdmin === "disconnected" && (
        <button onClick={handleCheckAdmin}>войти</button>
      )}
      {isAdmin === "false" && (
        <button onClick={handleToggleAdminPanel}>
          {/* <GrUserAdmin
              style={{
                fontSize: w > 686 ? "26px" : "14px",
                color: "var(--text-color)",
              }}
            /> */}
          стать админом
        </button>
      )}
      {isAdmin === "true" && (
        <div className="signerAddress">
          {signerAddress.slice(0, 3) +
            "..." +
            signerAddress.slice(signerAddress.length - 3, signerAddress.length)}
          <br />
          админ
        </div>
      )}
      {/* <button onClick={connectWallet}>
          {isConnected ? "connnected" : "connnect"}
        </button> */}
    </header>
  );
};
