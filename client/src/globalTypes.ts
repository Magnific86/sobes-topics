import { ReactNode } from "react"

export interface ChildrenProps {
  children: ReactNode
}

export interface IPost {
  _id: string
  hash: string
  question: string
  answer: string
  category: string
  timeCreated: string
}

export interface LayoutProps {
  children: ReactNode
}

export interface ISocial {
  icon: ReactNode
  url: string
}
