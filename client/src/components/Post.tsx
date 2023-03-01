import { FC } from "react";

interface PostProps {
  answer: string;
  timeCreated: string;
}

export const Post: FC<PostProps> = ({ answer, timeCreated }) => {
  return (
    <div className="eachPost">
      <div className="mainContent">
        <p>{answer}</p>
      </div>
      <div className="timeCreated">
        <p>Создано: {timeCreated}</p>
      </div>
    </div>
  );
};
