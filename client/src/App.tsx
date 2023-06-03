import { Collapse } from "antd"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
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
                      <ListOptions post={{ _id, hash, question, answer, category, timeCreated }} />
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
                          <ListOptions post={{ _id, hash, question, answer, category, timeCreated }} />
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
      {!serverError && allPosts?.every(p => !regexp.test(p.question)) && (
        <p className="notFinded">Ничего не найдено...</p>
      )}
    </div>
  )
}
