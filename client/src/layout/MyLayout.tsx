import { FC } from "react";
import { AddPostForm } from "../components/AddPostForm";
import { FeedbackForm } from "../components/FeedbackForm";
import { useAppContext } from "../context/MyContext";
import { AboutDrawer } from "../components/AboutDrawer";
import { Image } from "antd";
import { ISocial, LayoutProps } from "../globalTypes";
import { AdminPanel } from "../components/AdminPanel";
import { EditModal } from "../components/EditModal";
import { socials } from "../utils/staticArrs/socials";
import { useWindowSize } from "../utils/hooks/useWindowSize";
import { MyHeader } from "../components/MyHeader";

export const MyLayout: FC<LayoutProps> = ({ children }) => {
  const { theme, currId, oldQuestion, oldAnswer, oldCateg, oldTimeCreated } = useAppContext();
  const { width: w } = useWindowSize();

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
      <MyHeader />
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
        oldTimeCreated={oldTimeCreated}
      />
    </div>
  );
};
