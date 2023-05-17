import { FC } from "react"
import { ISocial } from "../globalTypes"
import { socials } from "../utils/staticArrs/socials"

export const MyFooter: FC = () => (
  <footer>
    <div className="divider" />
    <div className="upperFooter">
      <h4>Контакты, соц сети и ссылка на гитхаб:</h4>
      <ul className="socialList">
        {socials.map((el: ISocial) => (
          <a key={el.url} href={el.url} target="_blank" rel="noreferrer">
            <li>{el.icon}</li>
          </a>
        ))}
      </ul>
    </div>
  </footer>
)
