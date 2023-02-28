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
  posts: any;
  setPosts: (state: any) => void;
}

const MyContext = createContext<ContextState>(null);

const AppProvider = MyContext.Provider;

export const MainProvider: FC<ChildrenProps> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState(() => {
    (async () => {
      try {
        const data = await axios.get(
          "http://localhost:5000/api/posts" //https://eu-central-1.aws.data.mongodb-api.com/app/data-opjow/endpoint/data/v1
        );
        // const data = await resp.json();
        console.log("MFOSENGJPERNBDRPIBNDPBNFPBNF", data.data);
        if (data) {
          setPosts(data.data);
        }
      } catch (e) {
        console.error("MFOSENGJPERNBDRPIBNDPBNFPBNF", e);
      }
    })();
  });

  // console.log("WHAT IN POSTS AFTER FETCH", posts);

  const [theme, setTheme] = useState(() =>
    JSON.parse(localStorage.getItem("theme"))
  );

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
        posts,
        setPosts,
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
