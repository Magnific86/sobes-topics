import { Button, Modal } from "antd";
import { FC, FormEvent, ChangeEvent, useState, useRef } from "react";
import { useAppContext } from "../context/MyContext";
import emailjs from "@emailjs/browser";

interface IValue {
  title: string;
  text: string;
  email?: string;
  isLiked?: boolean;
}

export const FeedbackForm: FC = () => {
  const { openModal, handleToggleModal } = useAppContext();
  const [value, setValue] = useState<IValue>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("value from feedback form", value);

    try {
      // const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!value.title || value.text) {
        setError("Please, fill in at least title and text");
      } else {
        emailjs.sendForm(
          "default_service",
          "template_my",
          formRef.current,
          "l1LBuE0jVt7xC1_kY"
        );
        setValue(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueField = e.target.value;
    const name = e.target.name;
    setValue({ ...value, [name]: valueField });
  };

  return (
    <Modal
      title="Leave your feedback here"
      centered
      open={openModal}
      // onOk={() => setOpen(false)}
      onCancel={handleToggleModal}
      width={1000}
      footer={null}
    >
      <form
        className="feedbackForm"
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="title">Title</label>
        <input type="text" name="title" onChange={handleChange} />
        <label htmlFor="text">Text</label>
        <input type="text" name="text" onChange={handleChange} />
        <label htmlFor="email">email</label>
        <input type="email" name="email" onChange={handleChange} />
        <button>post</button>
      </form>
    </Modal>
  );
};
