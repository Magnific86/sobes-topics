import { Modal } from "antd"
import { FC, FormEvent, ChangeEvent, useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useAppContext } from "../context/MyContext"
import { categories } from "../utils/staticArrs/categories"
import { IServerPost } from "../globalTypes"
import { PostAction } from "../utils/actions/postAction"

export const EditModal: FC = () => {
  const { openEditModal, handleToggleEditModal, getAllPosts, activeCateg, handleFilterPosts, currId } = useAppContext()
  const [buttonContent, setButtonContent] = useState("edit")

  const [currentPost, setCurrentPost] = useState<IServerPost>({
    _id: "",
    question: "",
    answer: "",
    category: "",
    timeCreated: "",
    hash: "",
  })

  useEffect(() => {
    PostAction.getCurrentPost(currId)
      .then(result => {
        if (result.status === 200) {
          setCurrentPost(result.data.body)
        } else {
          toast.error("Failed to get post")
        }
      })
      .catch(() => {})
  }, [openEditModal])

  const onEditPostHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setButtonContent("editing...")
    PostAction.editCurrentPost(currentPost).then(result => {
      if (result.status === 200) {
        activeCateg === "all" ? getAllPosts() : handleFilterPosts(activeCateg)
        setButtonContent("edit")
        handleToggleEditModal()
      } else {
        toast.error("failed to edit post")
      }
    })
  }

  const changeDataHandler = (
    key: string,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value: string = e.target.value
    setCurrentPost({ ...currentPost, [key]: value })
  }

  return (
    <Modal centered open={openEditModal} onCancel={handleToggleEditModal} width={1000} footer={null}>
      <form className="addPostForm" onSubmit={e => onEditPostHandler(e)}>
        <h1>Редактировать пост</h1>
        <label htmlFor="question">Вопрос</label>
        <input
          type="text"
          name="question"
          value={currentPost?.question}
          onChange={e => changeDataHandler("question", e)}
        />
        <label htmlFor="answer">Ответ</label>
        <textarea name="answer" value={currentPost?.answer} onChange={e => changeDataHandler("answer", e)} />
        <select value={currentPost?.category} onChange={e => changeDataHandler("category", e)}>
          <option value="">Категория</option>
          {categories.map(el => (
            <option key={el.value} value={el.value}>
              {el.title}
            </option>
          ))}
        </select>
        <button>{buttonContent}</button>
      </form>
    </Modal>
  )
}
