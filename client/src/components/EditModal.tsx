import { Modal } from "antd";
import axios from "axios";
import { FC, FormEvent, ChangeEvent, useState, useEffect } from "react";
import sha256 from "sha256";
import { toast } from "react-toastify";
import { useAppContext } from "../context/MyContext";
import { categories } from "../utils/staticArrs/categories";
import { getSignerFunc } from "../utils/web3Actions/getSignerFunc";

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
  // const oldQuestionForCheck: string = oldQuestion;
  // const oldAnswerForCheck: string = oldAnswer;
  // const oldCategForCheck: string = oldCateg;
  const { openEditModal, handleToggleEditModal, getAllPosts } = useAppContext();
  const [buttonContent, setButtonContent] = useState("edit");
  const [question, setQuestion] = useState<string>(oldQuestion);
  const [answer, setAnswer] = useState<string>(oldAnswer);
  const [categ, setCateg] = useState<string>(oldCateg);

  useEffect(() => {
    setAnswer(oldAnswer);
    setQuestion(oldQuestion);
    setCateg(oldCateg);
  }, [openEditModal]);

  const handleEditPost = async (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    if (answer.length <= 0 || question.length <= 0 || categ.length <= 0) {
      toast.error("Не может ничего не быть))");
      return;
    }

    setButtonContent("editing...");

    if (
      !(answer === oldAnswer) ||
      !(question === oldQuestion) ||
      !(categ === oldCateg)
    ) {
      try {
        const oldHash = sha256(String(oldQuestion + oldAnswer + oldCateg));
        const hash = sha256(String(question + answer + categ));
        console.log("hash", hash);

        const editedPost = {
          _id: id,
          hash,
          question,
          answer,
          category: categ,
          timeCreated: String(new Date().toLocaleString() + "Upd"),
        };
        console.log("new post", editedPost);

        const { signedContract } = await getSignerFunc();
        const tx = await signedContract.setNewPostHashAfterEdit(hash, oldHash);
        console.log("tx before wait", tx);
        await tx.wait();
        console.log("tx after wait", tx);
        const data = await axios.put(
          "http://localhost:5000/api/posts",
          editedPost
        );
        console.log(data.data);
        toast.success("пост успешно редактирован");
      } catch (e) {
        console.error(e);
        toast.error(e?.message);
      }
      getAllPosts();
      setButtonContent("edit");
      handleToggleEditModal();
    } else {
      toast.error("Ничего не поменялось, запрос не отправлен...");
      setButtonContent("edit");
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
