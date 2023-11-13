import { Collapse } from "antd"
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from "react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import { Post } from "./components/Post"
import { SearchOutlined } from "@ant-design/icons"
import { useAppContext } from "./context/MyContext"
import { useDebounce } from "./utils/hooks/useDebounce"
import { useWindowSize } from "./utils/hooks/useWindowSize"
import { Categories } from "./components/Categories"
import { ListOptions } from "./components/ListOptions"

export const App: FC = () => {
  const { handleToggleTheme, handleToggleDrawer } = useAppContext()
  const [key, setKey] = useState("")

  const hotkeysFn = (e: KeyboardEvent<HTMLBodyElement>) => {
    const isCtrl = key === "ControlLeft" || key === "ControlRight"
    const isJ = e.code === "KeyJ"
    const isA = e.code === "KeyA"

    if (!isCtrl && !isJ && !isA) {
      console.log("nmveoubnfuoi")

      setKey("")
    }

    if (e.code === "ControlLeft" || e.code === "ControlRight") {
      setKey(e.code)
    } else if (isJ && isCtrl) {
      e.preventDefault()
      handleToggleTheme()
      setKey("")
    } else if (isA && isCtrl) {
      e.preventDefault()
      handleToggleDrawer()
      setKey("")
    } else {
      setKey("")
    }
  }

  useEffect(() => {
    //@ts-ignore
    document.body.addEventListener("keydown", e => hotkeysFn(e))
    return () => {
      //@ts-ignore
      document.body.removeEventListener("keydown", e => hotkeysFn(e))
    }
  })

  const { width: w } = useWindowSize()
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [shownAnswers, setShownAnswers] = useState([])

  const { isAdmin, getAllPosts, allPosts, serverError } = useAppContext()
  const inpRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getAllPosts()
  }, [])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  let regexp = new RegExp(debouncedSearchTerm, "gi")

  const highLight = (str: string) => {
    const findedStr = str.search(regexp)

    return (
      <h4>
        {str.slice(0, findedStr)}
        <span style={{ color: "yellow" }}>{str.slice(findedStr, findedStr + debouncedSearchTerm.length)}</span>
        {str.slice(findedStr + debouncedSearchTerm.length)}
      </h4>
    )
  }

  return (
    <div className="main">
      <div className="mainSearch">
        <label htmlFor="main">
          <SearchOutlined style={{ fontSize: "50px" }} />
        </label>
        <input value={searchTerm} onChange={handleSearch} id="main" className="visibleInput" ref={inpRef} type="text" />
      </div>
      <Categories />
      {w > 876 ? (
        <div className="desktopPosts">
          {allPosts?.length > 0 &&
            allPosts.map(({ _id, hash, question, answer, category, timeCreated }) => {
              if (regexp.test(question)) {
                return (
                  <div key={_id} className="eachPost">
                    {highLight(question)}
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
                    {isAdmin === "true" && <ListOptions post={{ _id, hash, question, answer, category, timeCreated }} />}
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
                        {isAdmin === "true" && <ListOptions post={{ _id, hash, question, answer, category, timeCreated }} />}
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
      {!serverError && allPosts?.every(p => !regexp.test(p.question)) && <p className="notFinded">Ничего не найдено...</p>}
    </div>
  )
}
