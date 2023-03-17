import { FC } from "react";

interface PostProps {
  answer: string;
  category: string;
  timeCreated: string;
}

export const Post: FC<PostProps> = ({ answer, category, timeCreated }) => {
  return (
    <div className="eachAnswer">
      <div className="mainContent">
        <p>{answer}</p>
      </div>
      <div className="categAndTimeCreated">
        <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
        <p>Создано: {timeCreated}</p>
      </div>
    </div>
  );
};
