import { createContext, FC, useState, useContext, useEffect } from "react";
import { ChildrenProps, IPost } from "../globalTypes";
import axios from "axios";

interface ContextState {
  theme: string;
  setTheme: (state: string) => void;
  handleToggleTheme: () => void;
  openDrawer: boolean;
  setOpenDrawer: (state: boolean) => void;
  handleToggleDrawer: () => void;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  handleToggleModal: () => void;
  buttonContent: string;
  setButtonContent: (str: string) => void;
  isAdmin: boolean;
  setIsAdmin: (state: boolean) => void;
  allPosts: IPost[];
  getAllPosts: () => void;
  openInfoDrawer: boolean;
  handleToggleInfoDrawer: () => void;
  setAllPosts: (posts: any) => void;
  openAdminPanel: boolean;
  handleToggleAdminPanel: () => void;
  openEditModal: boolean;
  handleToggleEditModal: () => void;
  currId: string;
  setCurrId: (state: string) => void;
  oldQuestion: string;
  setOldQuestion: (state: string) => void;
  oldAnswer: string;
  setOldAnswer: (state: string) => void;
  oldCateg: string;
  setOldCateg: (state: string) => void;
}

const MyContext = createContext<ContextState>(null);

const AppProvider = MyContext.Provider;

export const MainProvider: FC<ChildrenProps> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openInfoDrawer, setOpenInfoDrawer] = useState(false);
  const [openAdminPanel, setOpenAdminPanel] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [buttonContent, setButtonContent] = useState("post");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currId, setCurrId] = useState("");
  const [allPosts, setAllPosts] = useState();
  const [oldQuestion, setOldQuestion] = useState("");
  const [oldAnswer, setOldAnswer] = useState("");
  const [oldCateg, setOldCateg] = useState("");

  const getAllPosts = async () => {
    try {
      const data = await axios.get(`http://localhost:5000/api/posts`);
      // console.log("Post list updated", data.data.body);
      setAllPosts(data.data.body);
    } catch (e) {
      console.error("failed to update post list", e);
    }
  };

  const [theme, setTheme] = useState(
    () => JSON.parse(localStorage.getItem("theme")) || "dark"
  );

  const handleToggleEditModal = () => {
    setOpenEditModal(openEditModal ? false : true);
  };

  const handleToggleAdminPanel = () => {
    setOpenAdminPanel(openAdminPanel ? false : true);
  };

  const handleToggleInfoDrawer = () => {
    setOpenInfoDrawer(openInfoDrawer ? false : true);
  };

  const handleToggleModal = () => {
    setOpenModal(openModal ? false : true);
  };

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleToggleDrawer = () => {
    setOpenDrawer(openDrawer ? false : true);
  };

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    localStorage.setItem("theme", JSON.stringify(theme));
    body[0].setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <AppProvider
      value={{
        theme,
        setTheme,
        handleToggleTheme,
        openDrawer,
        setOpenDrawer,
        handleToggleDrawer,
        openModal,
        handleToggleModal,
        setOpenModal,
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
        oldQuestion,
        setOldQuestion,
        oldAnswer,
        setOldAnswer,
        oldCateg,
        setOldCateg,
      }}
    >
      {children}
    </AppProvider>
  );
};

export const useAppContext = () => {
  const data = useContext(MyContext);

  if (!data) {
    throw new Error("You cannot use MyContext outside AppProvider!");
  }
  return data;
};
