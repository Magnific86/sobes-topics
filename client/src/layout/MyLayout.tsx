import { FC, KeyboardEvent, useEffect, useState } from "react"
import { AddPostForm } from "../components/AddPostForm"
import { FeedbackForm } from "../components/FeedbackForm"
import { AboutDrawer } from "../components/AboutDrawer"
import { LayoutProps } from "../globalTypes"
import { AdminPanel } from "../components/AdminPanel"
import { EditModal } from "../components/EditModal"
import { MyHeader } from "./MyHeader"
import { MyFooter } from "./MyFooter"
import { useAppContext } from "../context/MyContext"

export const MyLayout: FC<LayoutProps> = ({ children }) => {
  const { handleToggleTheme, handleToggleDrawer } = useAppContext()
  const [keys, setKeys] = useState("")

  const hotkeysFn = (e: KeyboardEvent<HTMLBodyElement>) => {
    if (e.code === "ControlLeft") {
      setKeys(e.code)
    } else if (e.code === "KeyJ" && keys === "ControlLeft") {
      e.preventDefault()
      handleToggleTheme()
    } else if (e.code === "KeyA" && keys === "ControlLeft") {
      e.preventDefault()
      handleToggleDrawer()
    } else {
      setKeys("")
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

  return (
    <div className="container">
      <MyHeader />
      {children}
      <MyFooter />
      <AddPostForm />
      <FeedbackForm />
      <AboutDrawer />
      <AdminPanel />
      <EditModal />
    </div>
  )
}
