import { FormEvent, useRef } from "react"
import { Drawer } from "antd"
import { useAppContext } from "../context/MyContext"
import { toast } from "react-toastify"
import axios from "axios"
import { categories } from "../utils/staticArrs/categories"
import sha256 from "sha256"
import { useWindowSize } from "../utils/hooks/useWindowSize"
import { getSignerFunc } from "../utils/actions/getSignerFunc"

export const AddPostForm = () => {
  const {
    openDrawer,
    handleToggleDrawer,
    buttonContent,
    setButtonContent,
    getAllPosts,
    activeCateg,
    handleFilterPosts,
  } = useAppContext()
  const questRef = useRef<HTMLInputElement>(null)
  const answRef = useRef<HTMLTextAreaElement>(null)
  const categRef = useRef<HTMLSelectElement>(null)
  const errRef = useRef<HTMLSpanElement>(null)
  const { width: w } = useWindowSize()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const question = questRef.current?.value
    const answer = answRef.current?.value
    const category = categRef.current?.value
    const timeCreated = String(new Date().toLocaleString())
    if (question && answer && category) {
      setButtonContent("posting...")
      const hash = sha256(String(question + answer + category))

      const post = {
        hash: String(hash),
        question,
        answer,
        category,
        timeCreated,
      }
      console.table({ "ready to post to server ": post })

      try {
        const { signedContract } = await getSignerFunc()
        const tx = await signedContract.addPostHash(hash)
        await tx.wait()
        const res = await axios.post("http://localhost:5000/api/posts", post)
        console.log("res.data", res.data)
        toast.success("Пост успешно добавлен")
      } catch (e) {
        toast.error("failed to post new post")
        console.error(e)
      }
      setButtonContent("post")
      console.log("activeXateg in post form", activeCateg)

      activeCateg === "all" ? getAllPosts() : handleFilterPosts(activeCateg)
      answRef.current.value = ""
      questRef.current.value = ""
      categRef.current.value = ""
      handleToggleDrawer()
    } else {
      errRef.current.setAttribute("style", "opacity:1")
      !questRef.current.value && questRef.current.setAttribute("style", "border-bottom:2px solid red")
      !answRef.current.value && answRef.current.setAttribute("style", "border-bottom:2px solid red")
      !categRef.current.value && categRef.current.setAttribute("style", "border-bottom:2px solid red")
      setTimeout(() => {
        errRef.current.setAttribute("style", "opacity:0")
        questRef.current.setAttribute("style", "border-bottom:2px solid var(--black)")
        answRef.current.setAttribute("style", "border-bottom:2px solid var(--black)")
        categRef.current.setAttribute("style", "border-bottom:2px solid var(--black)")
      }, 3000)
    }
  }

  return (
    <Drawer
      placement="right"
      width={w > 900 ? 800 : 380}
      height={"80%"}
      open={openDrawer}
      onClose={handleToggleDrawer}
      headerStyle={{
        display: "flex",
        background: "var(--bg)",
        width: "100%",
      }}
      style={{ backgroundColor: "" }}
    >
      <div className="drawerContent">
        <div className="leftSideDrawer">
          <h1>Заполните поля вопроса и ответа, выберите категорию, и пост тут же появится в списке</h1>
        </div>
        <form className="addPostForm" onSubmit={(e) => handleSubmit(e)}>
          <span className="error-form" ref={errRef}>
            Заполните все поля
          </span>
          <label htmlFor="question">Вопрос</label>
          <input type="text" name="question" ref={questRef} />
          <label htmlFor="answer">Ответ</label>
          <textarea name="answer" ref={answRef} />
          <select ref={categRef}>
            <option value="">Категория</option>
            {categories.map((el) => (
              <option key={el.value} value={el.value}>
                {el.title}
              </option>
            ))}
          </select>
          <button>{buttonContent}</button>
        </form>
      </div>
    </Drawer>
  )
}
