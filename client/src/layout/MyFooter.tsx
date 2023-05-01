import { FC } from "react"
import { ISocial } from "../globalTypes"
import { Image } from "antd"
import { useAppContext } from "../context/MyContext"
import { socials } from "../utils/staticArrs/socials"
import darkVK from "../assets/darkVk.png"
import lightVK from "../assets/lightVk.png"

export const MyFooter: FC = () => {
  const { theme } = useAppContext()
  return (
    <footer>
      <div className="divider" />
      <div className="upperFooter">
        <h4>Контакты, соц сети и ссылка на гитхаб:</h4>
        <ul className="socialList">
          {socials.map((el: ISocial) => (
            <a key={el.url} href={el.url} target="_blank">
              <li>
                {el.url === "https://vk.com/klevtsov2018" ? (
                  <Image preview={false} width={50} height={50} src={theme === "dark" ? darkVK : lightVK} alt="VK" />
                ) : (
                  el.icon
                )}
              </li>
            </a>
          ))}
        </ul>
      </div>
    </footer>
  )
}
