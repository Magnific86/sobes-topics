import { FC, useState } from "react";
import { Contract } from "ethers";
import { AddPostForm } from "../components/AddPostForm";
import { DarkMode } from "../components/DarkMode";
import { FeedbackForm } from "../components/FeedbackForm";
import { useAppContext } from "../context/MyContext";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AboutDrawer } from "../components/AboutDrawer";
import { Image } from "antd";
import { ISocial, LayoutProps } from "../globalTypes";
import { AdminPanel } from "../components/AdminPanel";
import { EditModal } from "../components/EditModal";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { socials } from "../utils/staticArrs/socials";
import { getSignerFunc } from "../utils/web3Actions/getSignerFunc";
import { useWindowSize } from "../utils/hooks/useWindowSize";
import { abi, StorageAddress } from "../utils/web3Actions/addressAndAbi";

export const MyLayout: FC<LayoutProps> = ({ children }) => {
  const {
    handleToggleDrawer,
    handleToggleModal,
    handleToggleInfoDrawer,
    theme,
    handleToggleAdminPanel,
    isAdmin,
    currId,
    oldQuestion,
    oldAnswer,
    oldCateg,
    setIsAdmin,
  } = useAppContext();
  const { width: w } = useWindowSize();

  const handleCheckAdmin = async () => {
    try {
      const { signer, signedContract } = await getSignerFunc();
      const boolIsAdmin = await signedContract.admins(signer.getAddress());
      setIsAdmin(String(boolIsAdmin));
      console.log("boolIs admin", boolIsAdmin);
    } catch (e) {
      toast.error("Не удалось подключиться и проверить на админа");
    }
  };

  // const getMetaMaskBalance = async () => {
  //   //@ts-ignore
  //   const walletProvider = new BrowserProvider(window.ethereum);
  //   const signer = await walletProvider.getSigner();
  //   setMmBalance(
  //     formatEther(await walletProvider.getBalance(signer.getAddress()))
  //   );
  // };

  // useEffect(() => {}, []);

  return (
    <div className="container">
      <header>
        <DarkMode />
        <button onClick={handleToggleDrawer}>
          {w > 768 ? (
            "Добавить пост"
          ) : (
            <IoIosAddCircle style={{ fontSize: w > 686 ? "26px" : "14px" }} />
          )}
        </button>
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
        {isAdmin === "true" && <h1>уже админ</h1>}
        {/* <button onClick={connectWallet}>
          {isConnected ? "connnected" : "connnect"}
        </button> */}
      </header>
      {children}
      <footer>
        <div className="divider" />
        <div className="upperFooter">
          <h4>Контакты, соц сети и ссылка на гитхаб:</h4>
          <ul className="socialList">
            {socials.map((el: ISocial) => (
              <a key={el.url} href={el.url} target="_blank">
                <li>
                  {el.url === "https://vk.com/klevtsov2018" ? (
                    <Image
                      preview={false}
                      width={50}
                      height={50}
                      src={`/${theme}Vk.png`}
                      alt="VK"
                    />
                  ) : (
                    el.icon
                  )}
                </li>
              </a>
            ))}
          </ul>
        </div>
      </footer>
      <AddPostForm />
      <FeedbackForm />
      <AboutDrawer />
      <AdminPanel />
      <EditModal
        id={currId}
        oldQuestion={oldQuestion}
        oldAnswer={oldAnswer}
        oldCateg={oldCateg}
      />
    </div>
  );
};
