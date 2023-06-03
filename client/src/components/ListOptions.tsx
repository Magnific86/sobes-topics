import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Popconfirm } from "antd"
import { FC, MouseEvent } from "react"
import { IPost } from "../globalTypes"
import { useAppContext } from "../context/MyContext"
import { PostAction } from "../utils/actions/postAction"

interface ListOptionsProps {
  post: IPost
}

export const ListOptions: FC<ListOptionsProps> = ({ post: { _id, hash, question, answer, category, timeCreated } }) => {
  const { getAllPosts, setCurrId, handleToggleEditModal } = useAppContext()

  const confirmText = "Удаление поста"
  const confirmDescription = "Вы уверены, что хотите удалить этот пост?"

  const editPostHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setCurrId(_id)
    handleToggleEditModal()
  }

  return (
    <div className="options">
      <Popconfirm
        placement="topLeft"
        title={confirmText}
        description={confirmDescription}
        onConfirm={() => {
          PostAction.deleteCurrentPost(
            {
              _id,
              hash,
              question,
              answer,
              category,
              timeCreated,
            },
            getAllPosts
          )
        }}
        okText="Да"
        cancelText="Нет"
      >
        <button style={{ background: "transparent" }}>
          <DeleteOutlined
            style={{
              fontSize: "24px",
              color: "red",
            }}
          />
        </button>
      </Popconfirm>
      <button style={{ background: "transparent" }} onClick={e => editPostHandler(e)}>
        <EditOutlined
          style={{
            fontSize: "24px",
            color: "var(--black)",
          }}
        />
      </button>
    </div>
  )
}
