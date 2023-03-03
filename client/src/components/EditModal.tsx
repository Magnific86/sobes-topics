import { Modal } from "antd";
import axios from "axios";
import { FC, FormEvent, ChangeEvent, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context/MyContext";
import { categories } from "../utils/categories";

interface EditModalProps {
  id: string;
  oldQuestion: string;
  oldAnswer: string;
  oldCateg: string;
}

export const EditModal: FC<EditModalProps> = ({
  id,
  oldQuestion,
  oldAnswer,
  oldCateg,
}) => {
  const { openEditModal, handleToggleEditModal, getAllPosts } = useAppContext();
  const [buttonContent, setButtonContent] = useState("edit");
  const [question, setQuestion] = useState(oldQuestion);
  const [answer, setAnswer] = useState(oldAnswer);
  const [categ, setCateg] = useState(oldCateg);

  useEffect(() => {
    setAnswer(oldAnswer);
    setQuestion(oldQuestion);
    setCateg(oldCateg);
  }, [openEditModal]);

  const handleEditPost = async (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setButtonContent("editing...");
    const editedPost = {
      _id: id,
      question: question,
      answer: answer,
      category: categ,
      timeCreated: String(new Date().toLocaleString()),
    };
    try {
      const data = await axios.put(
        "http://localhost:5000/api/posts",
        editedPost
      );
      console.log(data.data);
      toast.success("post successfully updated");
    } catch (e) {
      console.error(e);
      toast.error(e?.message);
    } finally {
      getAllPosts();
      setButtonContent("edit");
      handleToggleEditModal();
    }
  };

  const handleQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswer = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleCateg = (e: ChangeEvent<HTMLSelectElement>) => {
    setCateg(e.target.value);
  };

  return (
    <Modal
      centered
      open={openEditModal}
      onCancel={handleToggleEditModal}
      width={1000}
      footer={null}
    >
      <form className="addPostForm" onSubmit={(e) => handleEditPost(e, id)}>
        <h1>Редактировать пост</h1>
        <label htmlFor="question">Вопрос</label>
        <input
          type="text"
          name="question"
          value={question}
          onChange={(e) => handleQuestion(e)}
        />
        <label htmlFor="answer">Ответ</label>
        <textarea
          name="answer"
          value={answer}
          onChange={(e) => handleAnswer(e)}
        />
        <select value={categ} onChange={(e) => handleCateg(e)}>
          <option value="">Категория</option>
          {categories.map((el) => (
            <option key={el.value} value={el.value}>
              {el.title}
            </option>
          ))}
        </select>
        <button>{buttonContent}</button>
      </form>
    </Modal>
  );
};
