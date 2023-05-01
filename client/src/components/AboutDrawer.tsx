import { FC } from "react"
import { Drawer } from "antd"
import { useAppContext } from "../context/MyContext"

export const AboutDrawer: FC = () => {
  const { openInfoDrawer, handleToggleInfoDrawer } = useAppContext()

  return (
    <Drawer
      title="Fill in form to add new post"
      placement="bottom"
      width={800}
      height={"80%"}
      open={openInfoDrawer}
      onClose={handleToggleInfoDrawer}
      headerStyle={{ display: "none" }}
      style={{ backgroundColor: "red" }}
    >
      <div className="aboutDrawer">
        <h1> Какое-то описание, принцып работы</h1>
        <p>
          По сути это простое хранилище постов на разные технологии, тоесть можно в пост указывать как вопрос и ответ, а
          можно просто рассказать про какую-то тему. Созданный пост хэшируется и отправляется в контракт, а содержание
          поста тоже с хэшем для сопоставления идет в монго. Таким образом осуществляется четкий контроль над постами
          (допустим, в них важная информация, и нельзя допустить, что они были подделаны). Соответственно, когда мы
          хотим что-нибудь удалить или редактировать пост, поднимается сначала транакция, и либо удаляет хэш из
          блокчейна, либо (при редактировании) меняет на новый, чтобы по измененному хэшу можно было понять, что и пост
          поменялся. Но чтобы как-то менять посты, тем самым меняя и блокчейн, и БД, нужно знать "cyпepceкpeтный"
          пароль, тем самым став админом.
        </p>
      </div>
    </Drawer>
  )
}
