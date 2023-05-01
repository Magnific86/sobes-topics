import { FC } from "react"
import { useAppContext } from "../context/MyContext"

interface PostProps {
  answer: string
  category: string
  timeCreated: string
}

export const Post: FC<PostProps> = ({ answer, category, timeCreated }) => {
  const { activeCateg } = useAppContext()
  return (
    <div className="eachAnswer">
      <div className="mainContent">
        <p>{answer}</p>
      </div>
      <div className="categAndTimeCreated">
        {activeCateg === "all" && <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>}
        <p>Создано: {timeCreated}</p>
      </div>
    </div>
  )
}
