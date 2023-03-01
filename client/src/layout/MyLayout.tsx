import React, { FC, ReactNode } from "react";
import { AddPostForm } from "../components/AddPostForm";
import { DarkMode } from "../components/DarkMode";
import { FeedbackForm } from "../components/FeedbackForm";
import { useAppContext } from "../context/MyContext";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AboutDrawer } from "../components/AboutDrawer";

interface LayoutProps {
  children: ReactNode;
}

export const MyLayout: FC<LayoutProps> = ({ children }) => {
  const { handleToggleDrawer, handleToggleModal, handleToggleInfoDrawer } =
    useAppContext();
  return (
    <div className="container">
      <header>
        <DarkMode />
        <button onClick={handleToggleDrawer}>Add form</button>
        <button onClick={handleToggleModal}>Leave feedback</button>
        <button onClick={handleToggleInfoDrawer}>
          <InfoCircleOutlined style={{ fontSize: "30px" }} />
        </button>
      </header>
      {children}
      <footer>
        <p>footer</p>
      </footer>
      <AddPostForm />
      <FeedbackForm />
      <AboutDrawer />
    </div>
  );
};
