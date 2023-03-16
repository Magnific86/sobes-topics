import { Modal, Rate } from "antd";
import { FC, FormEvent, ChangeEvent, useState, useRef } from "react";
import { useAppContext } from "../context/MyContext";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

interface IValue {
  title: string;
  text: string;
  email?: string;
  isLiked?: boolean;
}

export const FeedbackForm: FC = () => {
  const { openModal, handleToggleModal, buttonContent, setButtonContent } =
    useAppContext();
  const [value, setValue] = useState<IValue>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [rate, setRate] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("value from feedback form", value);

    try {
      // const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!value.title || !value.text) {
        setError("Please, fill in at least title and text");
      } else {
        setButtonContent("posting...");
        const data = await emailjs.sendForm(
          "service_pqbpgjg",
          "sobesTopicsFeedbackForm",
          formRef.current,
          "l1LBuE0jVt7xC1_kY"
        );
        setValue(null);
        console.log("response from emailjs", data);
        toast.success("Запрос успешно отправлен");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setButtonContent("post");
      handleToggleModal();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueField = e.target.value;
    const name = e.target.name;
    setValue({ ...value, [name]: valueField });
  };

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  return (
    <Modal
      centered
      open={openModal}
      onCancel={handleToggleModal}
      width={1000}
      footer={null}
    >
      <form
        className="feedbackForm"
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>Если есть пожелания, критика или предложение, заполните фому</h1>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" onChange={handleChange} />
        <label htmlFor="text">Text</label>
        <input type="text" name="text" onChange={handleChange} />
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          // onBlur={(e) => onBlur(e)}
        />
        <div className="rate">
          <p>rate: </p>
          <span>
            <Rate tooltips={desc} onChange={setRate} value={rate} />
            {value ? (
              <span className="ant-rate-text">{desc[rate - 1]}</span>
            ) : (
              ""
            )}
          </span>
          <input type="hidden" name="rate" value={rate} />
        </div>

        <button>{buttonContent}</button>
      </form>
    </Modal>
  );
};
