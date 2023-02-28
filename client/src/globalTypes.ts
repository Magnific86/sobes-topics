import { ReactNode } from "react";

export interface ChildrenProps {
    children: ReactNode;
  }

  export interface IPost {
    question: string
    answer: string
    timeCreated: string
  }