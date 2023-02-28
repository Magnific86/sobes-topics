import { FC } from "react";

interface PostProps {
  question: string;
  answer: string;
  timeCreated: string;
}

export const Post: FC<PostProps> = ({ question, answer, timeCreated }) => {
  return (
    <div className="post">
      <h1>{question}</h1>
      <p>{answer}</p>
      <p>{timeCreated}</p>
    </div>
  );
};
