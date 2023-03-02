import { FC } from "react";
import { AddPostForm } from "../components/AddPostForm";
import { DarkMode } from "../components/DarkMode";
import { FeedbackForm } from "../components/FeedbackForm";
import { useAppContext } from "../context/MyContext";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AboutDrawer } from "../components/AboutDrawer";
import { useWindowSize } from "../utils/useWindowSize";
import { Image } from "antd";
import { InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";
import { ISocial, LayoutProps } from "../globalTypes";
import { FaTelegramPlane } from "@react-icons/all-files/fa/FaTelegramPlane";
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub";
import { BsEmojiSunglasses } from "react-icons/bs";

export const MyLayout: FC<LayoutProps> = ({ children }) => {
  const {
    handleToggleDrawer,
    handleToggleModal,
    handleToggleInfoDrawer,
    theme,
  } = useAppContext();
  const { width: w } = useWindowSize();
  console.log(w);

  const socials: ISocial[] = [
    {
      icon: <InstagramOutlined />,
      url: "https://www.instagram.com/klevtsov49/",
    },
    {
      icon: <BsEmojiSunglasses />,
      url: "https://portfolio-two-brown-94.vercel.app/",
    },
    {
      icon: <FaTelegramPlane />,
      url: "https://t.me/nodefined",
    },
    {
      icon: <AiFillGithub />,
      url: "https://github.com/Magnific86/sobes-topics/tree/main",
    },
    {
      icon: <LinkedinOutlined />,
      url: "https://www.linkedin.com/in/nikita-klevtsov-018a59263/",
    },
    {
      icon: (
        <Image
          preview={false}
          width={50}
          height={50}
          src={`/${theme}Vk.png`}
          alt="VK"
        />
      ),
      url: "https://vk.com/klevtsov2018",
    },
  ];

  return (
    <div className="container">
      <header>
        <DarkMode />
        <button onClick={handleToggleDrawer}>Add form</button>
        <button onClick={handleToggleModal}>
          {w > 600 ? "Leave feedback" : "Feedback"}
        </button>
        <button onClick={handleToggleInfoDrawer}>
          <InfoCircleOutlined style={{ fontSize: w > 689 ? "26px" : "14px" }} />
        </button>
      </header>
      {children}
      <footer>
        <div className="divider" />
        <div className="upperFooter">
          <h4>Контакты, соц сети и ссылка на гитхаб:</h4>
          <ul className="socialList">
            {socials.map((el: ISocial) => (
              <a key={el.url} href={el.url} target="_blank">
                <li>{el.icon}</li>
              </a>
            ))}
          </ul>
        </div>
      </footer>
      <AddPostForm />
      <FeedbackForm />
      <AboutDrawer />
    </div>
  );
};
