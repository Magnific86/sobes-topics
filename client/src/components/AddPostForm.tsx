import { FormEvent, ChangeEvent, useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import { useAppContext } from "../context/MyContext";
import { IPost } from "../globalTypes";
import { toast } from "react-toastify";
import axios from "axios";
import { categories } from "../utils/categories";

interface IValue {
  question: string;
  answer: string;
}

export const AddPostForm = () => {
  const { openDrawer, handleToggleDrawer } = useAppContext();
  const [value, setValue] = useState<IValue>(null);
  const [choosenCateg, setChoosenCateg] = useState<string>(null);

  const handleCategChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChoosenCateg(e.target.value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueField = e.target.value;
    const name = e.target.name;
    setValue({ ...value, [name]: valueField });
  };

  const postForm = async (post: IPost) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        JSON.stringify(post),
        {}
      );
      console.log(res.data);
      toast.success("success");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = { ...value, timeCreated: String(new Date()) };
    console.log("post", post);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        JSON.stringify(post),
        {
          // headers: {
          //   "Content-Type": "application/json",
          //   Authorization:
          //     "mongodb+srv://username:simple-password@mycluster.7uy4jc6.mongodb.net/?retryWrites=true&w=majority",
          // },
        }
      );
      console.log("res.data", res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Drawer
      title="Fill in form to add new post"
      placement="bottom"
      width={800}
      height={"80%"}
      open={openDrawer}
      onClose={handleToggleDrawer}
      headerStyle={{display: "none"}}
      style={{backgroundColor: ""}}
      // extra={
      //   <Space>
      //     <Button onClick={onClose}>Cancel</Button>
      //     <Button type="primary" onClick={onClose}>
      //       OK
      //     </Button>
      //   </Space>
      // }
    >
      <div className="drawerContent">
        <div className="leftSideDrawer">
          <h1>
            Plaese choose category, right answer and tight question lorem lorem
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <form className="addPostForm" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="question">question</label>
          <input type="text" name="question" onChange={handleChange} />
          <label htmlFor="answer">answer</label>
          <input type="text" name="answer" onChange={handleChange} />
          <select onChange={handleCategChange}>
            {categories.map((el) => (
              <option key={el.value} value={el.value}>
                {el.title}
              </option>
            ))}
          </select>
          <button>post</button>
        </form>
      </div>
    </Drawer>
  );
};
