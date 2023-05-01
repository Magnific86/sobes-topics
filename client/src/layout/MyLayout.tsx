import { FC } from "react"
import { AddPostForm } from "../components/AddPostForm"
import { FeedbackForm } from "../components/FeedbackForm"
import { useAppContext } from "../context/MyContext"
import { AboutDrawer } from "../components/AboutDrawer"
import { LayoutProps } from "../globalTypes"
import { AdminPanel } from "../components/AdminPanel"
import { EditModal } from "../components/EditModal"
import { MyHeader } from "./MyHeader"
import { MyFooter } from "./MyFooter"

export const MyLayout: FC<LayoutProps> = ({ children }) => {
  const { currId, oldQuestion, oldAnswer, oldCateg, oldTimeCreated } = useAppContext()

  return (
    <div className="container">
      <MyHeader />
      {children}
      <MyFooter />
      <AddPostForm />
      <FeedbackForm />
      <AboutDrawer />
      <AdminPanel />
      <EditModal
        id={currId}
        oldQuestion={oldQuestion}
        oldAnswer={oldAnswer}
        oldCateg={oldCateg}
        oldTimeCreated={oldTimeCreated}
      />
    </div>
  )
}
