import React, { FC, ReactNode } from "react";
import { AddPostForm } from "../components/AddPostForm";
import { DarkMode } from "../components/DarkMode";
import { FeedbackForm } from "../components/FeedbackForm";
import { useAppContext } from "../context/MyContext";

interface LayoutProps {
  children: ReactNode;
}

export const MyLayout: FC<LayoutProps> = ({ children }) => {
  const { handleToggleDrawer, handleToggleModal } = useAppContext();
  return (
    <div className="container">
      <header>
        <DarkMode />
        <button onClick={handleToggleDrawer}>Add form</button>
        <button onClick={handleToggleModal}>Leave your feedback</button>
      </header>
      {children}
      <footer>
        <p>footer</p>
      </footer>
      <AddPostForm />
      <FeedbackForm />
    </div>
  );
};
