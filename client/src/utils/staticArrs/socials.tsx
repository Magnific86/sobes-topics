import { FaTelegramPlane } from "@react-icons/all-files/fa/FaTelegramPlane"
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub"
import { BsEmojiSunglasses } from "react-icons/bs"
import { LinkedinOutlined } from "@ant-design/icons"
import { ISocial } from "../../globalTypes"

export const socials: ISocial[] = [
  {
    icon: <BsEmojiSunglasses />,
    url: "https://portfolio-flame-kappa-68.vercel.app/",
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
]
