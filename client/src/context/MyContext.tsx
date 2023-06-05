import { createContext, FC, useState, useContext, useEffect } from "react"
import { ChildrenProps, IPost } from "../globalTypes"
import axios from "axios"
import { toast } from "react-toastify"

interface ContextState {
  theme: string
  handleToggleTheme: () => void
  openDrawer: boolean
  handleToggleDrawer: () => void
  openModal: boolean
  handleToggleModal: () => void
  buttonContent: string
  setButtonContent: (str: string) => void
  isAdmin: string
  setIsAdmin: (state: string) => void
  allPosts: IPost[]
  getAllPosts: () => void
  openInfoDrawer: boolean
  handleToggleInfoDrawer: () => void
  setAllPosts: (posts: any) => void
  openAdminPanel: boolean
  handleToggleAdminPanel: () => void
  openEditModal: boolean
  handleToggleEditModal: () => void
  currId: string
  setCurrId: (state: string) => void
  activeCateg: string
  setActiveCateg: (state: string) => void
  serverError: boolean
  setServerError: (state: boolean) => void
  handleFilterPosts: (state: string) => void
}

const MyContext = createContext<ContextState>(null)

const AppProvider = MyContext.Provider

export const MainProvider: FC<ChildrenProps> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openInfoDrawer, setOpenInfoDrawer] = useState(false)
  const [openAdminPanel, setOpenAdminPanel] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [buttonContent, setButtonContent] = useState("post")
  const [isAdmin, setIsAdmin] = useState("disconnected")
  const [currId, setCurrId] = useState("")
  const [allPosts, setAllPosts] = useState()
  const [activeCateg, setActiveCateg] = useState("all")
  const [serverError, setServerError] = useState(false)

  const getAllPosts = async () => {
    try {
      const data = await axios.get(`http://localhost:5000/api/posts`)
      setAllPosts(data.data.body)
      setServerError(false)
    } catch (e) {
      setServerError(true)
      console.error("failed to update post list", e)
    }
  }

  const handleFilterPosts = async (category: string) => {
    try {
      const data = await axios.get(`http://localhost:5000/api//posts/filtered/${category}`)
      setAllPosts(data.data.body)
    } catch (e) {
      console.error(e)
      toast.error(e?.message)
    }
  }

  const [theme, setTheme] = useState(() => JSON.parse(localStorage.getItem("theme")) || "dark")

  const handleToggleEditModal = () => {
    setOpenEditModal(openEditModal ? false : true)
  }

  const handleToggleAdminPanel = () => {
    setOpenAdminPanel(openAdminPanel ? false : true)
  }

  const handleToggleInfoDrawer = () => {
    setOpenInfoDrawer(openInfoDrawer ? false : true)
  }

  const handleToggleModal = () => {
    setOpenModal(openModal ? false : true)
  }

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleToggleDrawer = () => {
    setOpenDrawer(openDrawer ? false : true)
  }

  useEffect(() => {
    const body = document.getElementsByTagName("body")
    localStorage.setItem("theme", JSON.stringify(theme))
    body[0].setAttribute("data-theme", theme)
  }, [theme])

  return (
    <AppProvider
      value={{
        theme,
        handleToggleTheme,
        openDrawer,
        handleToggleDrawer,
        openModal,
        handleToggleModal,
        buttonContent,
        setButtonContent,
        isAdmin,
        setIsAdmin,
        allPosts,
        getAllPosts,
        openInfoDrawer,
        handleToggleInfoDrawer,
        setAllPosts,
        openAdminPanel,
        handleToggleAdminPanel,
        openEditModal,
        handleToggleEditModal,
        currId,
        setCurrId,
        activeCateg,
        setActiveCateg,
        serverError,
        setServerError,
        handleFilterPosts,
      }}
    >
      {children}
    </AppProvider>
  )
}

export const useAppContext = () => {
  const data = useContext(MyContext)

  if (!data) {
    throw new Error("You cannot use MyContext outside AppProvider!")
  }
  return data
}
