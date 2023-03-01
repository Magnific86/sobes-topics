import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface IPost {
  _id: string;
  question: string;
  answer: string;
  category: string;
  timeCreated: string;
}
