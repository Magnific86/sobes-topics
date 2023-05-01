import { Collapse, Popconfirm } from "antd"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import axios from "axios"
import { Post } from "./components/Post"
import { SearchOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { toast } from "react-toastify"
import { useAppContext } from "./context/MyContext"
import { useDebounce } from "./utils/hooks/useDebounce"
import { useWindowSize } from "./utils/hooks/useWindowSize"
import { getSignerFunc } from "./utils/web3Actions/getSignerFunc"
import { IPost } from "./globalTypes"
import sha256 from "sha256"
import { Categories } from "./components/Categories"

export const App: FC = () => {
  const { width: w } = useWindowSize()
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [shownAnswers, setShownAnswers] = useState([])
  const [editIndex, setEditIndex] = useState("closed")

  const {
    isAdmin,
    getAllPosts,
    allPosts,
    handleToggleEditModal,
    setOldQuestion,
    setOldAnswer,
    setOldCateg,
    oldTimeCreated,
    setOldTimeCreated,
    setCurrId,
    serverError,
  } = useAppContext()
  const inpRef = useRef<HTMLInputElement>(null)

  const handleDeletePost = async (post: IPost) => {
    try {
      const hash = sha256(String(post.question + post.answer + post.category))
      const { signedContract } = await getSignerFunc()
      const tx = await signedContract.deletePostHash(hash)
      await tx.wait()
      const data = await axios.delete(`http://localhost:5000/api/posts/${post._id}`)
      console.log(data.data)
      toast.success("Пост успешно удален")
    } catch (e) {
      console.error(e)
      toast.error("failed to delete post")
    }
    getAllPosts()
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  let regexp = new RegExp(debouncedSearchTerm, "gi")

  const confirm = (post: IPost) => {
    handleDeletePost(post)
  }

  const confirmText = "Удаление поста"
  const confirmDescription = "Вы уверены, что хотите удалить этот пост?"

  return (
    <div className="main">
      <form className="mainSearch">
        <label htmlFor="main">
          <SearchOutlined style={{ fontSize: "50px" }} />
        </label>
        <input value={searchTerm} onChange={handleSearch} id="main" className="visibleInput" ref={inpRef} type="text" />
        <input type="submit" hidden />
      </form>
      <Categories />
      {w > 876 ? (
        <div className="desktopPosts">
          {allPosts?.length > 0 &&
            allPosts.map(({ _id, hash, question, answer, category, timeCreated }) => {
              if (regexp.test(question)) {
                return (
                  <div key={_id} className="eachPost">
                    <h4>{question}</h4>
                    <h5
                      id={hash}
                      onClick={() => {
                        navigator.clipboard.writeText(hash)
                        const button = document.getElementById(hash)
                        button.textContent = "скопировано"
                        setTimeout(() => {
                          button.textContent = "скопировать хэш"
                        }, 1000)
                      }}
                    >
                      скопировать хэш
                    </h5>
                    {isAdmin === "true" && (
                      <div className="options">
                        <Popconfirm
                          placement="topLeft"
                          title={confirmText}
                          description={confirmDescription}
                          onConfirm={() => {
                            confirm({
                              _id,
                              hash,
                              question,
                              answer,
                              category,
                              timeCreated,
                            })
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
                        <button
                          style={{ background: "transparent" }}
                          onClick={(e) => {
                            handleToggleEditModal()
                            e.stopPropagation()
                            setOldQuestion(question)
                            setOldAnswer(answer)
                            setOldCateg(category)
                            setOldTimeCreated(timeCreated)
                            setCurrId(_id)
                          }}
                        >
                          <EditOutlined
                            style={{
                              fontSize: "24px",
                              color: "var(--black)",
                            }}
                          />
                        </button>
                      </div>
                    )}
                    {!shownAnswers.includes(question) ? (
                      <h6 onClick={() => setShownAnswers([...shownAnswers, question])}>показать ответ</h6>
                    ) : (
                      <Post answer={answer} category={category} timeCreated={timeCreated} />
                    )}
                  </div>
                )
              }
            })}
        </div>
      ) : (
        <Collapse ghost>
          {allPosts?.length > 0 &&
            allPosts.map(({ _id, hash, question, answer, category, timeCreated }) => {
              if (regexp.test(question)) {
                return (
                  <Collapse.Panel
                    header={
                      <div className="collapseHeader">
                        <p>{question}</p>
                        {isAdmin === "true" && (
                          <div className="options">
                            <Popconfirm
                              placement="topLeft"
                              title={confirmText}
                              description={confirmDescription}
                              onConfirm={() => {
                                confirm({
                                  _id,
                                  hash,
                                  question,
                                  answer,
                                  category,
                                  timeCreated,
                                })
                              }}
                              okText="Да"
                              cancelText="Нет"
                            >
                              <button style={{ background: "transparent" }} onClick={(e) => e.stopPropagation()}>
                                <DeleteOutlined
                                  style={{
                                    fontSize: "24px",
                                    color: "red",
                                  }}
                                />
                              </button>
                            </Popconfirm>
                            <button
                              style={{ background: "transparent" }}
                              onClick={(e) => {
                                handleToggleEditModal()
                                e.stopPropagation()
                                setOldQuestion(question)
                                setOldAnswer(answer)
                                setOldCateg(category)
                                setCurrId(_id)
                              }}
                            >
                              <EditOutlined
                                style={{
                                  fontSize: "24px",
                                  color: "var(--black)",
                                }}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    }
                    key={_id}
                  >
                    <Post answer={answer} category={category} timeCreated={timeCreated} />
                  </Collapse.Panel>
                )
              }
            })}
        </Collapse>
      )}
      {serverError && <h1 className="someProblems">Some server problems!</h1>}
      {!serverError && allPosts?.every((p) => !regexp.test(p.question)) && (
        <p className="notFinded">Ничего не найдено...</p>
      )}
    </div>
  )
}
