import sha256 from "sha256"
import { getSignerFunc } from "./getSignerFunc"
import axios from "axios"
import { toast } from "react-toastify"
import { IPost, IServerPost } from "../../globalTypes"

const baseUrl = "/api"

const getAllPosts = async () => {
  try {
    return await axios.get(`${baseUrl}/posts`)
  } catch (e) {
    toast.error(e?.message)
    return e
  }
}

const getCurrentPost = async (id: string) => {
  try {
    return await axios.get(`${baseUrl}/posts/${id}`)
  } catch (e) {
    toast.error("failed to get post")
    return e
  }
}

const filterPosts = async (category: string) => {
  try {
    return await axios.get(`${baseUrl}/posts/filtered/${category}`)
  } catch (e) {
    toast.error(e?.message)
    return e
  }
}

const editCurrentPost = async ({ _id, question, answer, category, timeCreated, hash }: IServerPost) => {
  if (answer.length <= 0 || question.length <= 0 || category.length <= 0) {
    toast.error("Не может ничего не быть))")
    return
  }

  const newHash = sha256(String(question + answer + category))
  if (newHash !== hash) {
    const editedPost = {
      _id,
      hash,
      question,
      answer,
      category,
      timeCreated: timeCreated + " " + String("Upd" + new Date().toLocaleString()),
    }
    console.log("new post", editedPost)

    try {
      const { signedContract } = await getSignerFunc()
      const tx = await signedContract.setNewPostHashAfterEdit(newHash, hash)
      await tx.wait()
      const resp = await axios.put(`${baseUrl}/posts`, editedPost)
      toast.success("пост успешно редактирован")
      return resp
    } catch (e) {
      toast.error(e?.message)
      return e
    }
  } else {
    toast.error("Ничего не поменялось, запрос не отправлен...")
  }
}

const deleteCurrentPost = async (post: IPost, cbAfter: () => void) => {
  try {
    const hash = sha256(String(post.question + post.answer + post.category))
    const { signedContract } = await getSignerFunc()
    const tx = await signedContract.deletePostHash(hash)
    await tx.wait()
    const data = await axios.delete(`${baseUrl}/posts/${post._id}`)
    console.log(data.data)
    toast.success("Пост успешно удален")
  } catch (e) {
    console.error(e)
    toast.error("failed to delete post")
  }
  cbAfter()
}

export const PostAction = {
  getAllPosts,
  getCurrentPost,
  filterPosts,
  editCurrentPost,
  deleteCurrentPost,
}
