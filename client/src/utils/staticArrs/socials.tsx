import { FaTelegramPlane } from "@react-icons/all-files/fa/FaTelegramPlane";
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub";
import { BsEmojiSunglasses } from "react-icons/bs";
import { InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";
import { ISocial } from "../../globalTypes";

export const socials: ISocial[] = [
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
    icon: <></>,
    url: "https://vk.com/klevtsov2018",
  },
];
