import React from "react";
import { Link } from "react-router-dom";
const QuestionItem = ({ questionPost }) => {
  const { content, answer, id } = questionPost;
  return (
    <Link to={`/question/${id}`} className="question-item">
      <div>
        <h2 className="question">{content}</h2>
        <p className="answer">{(answer && answer.content) || ""}</p>
      </div>
      <button>read more</button>
    </Link>
  );
};
export default QuestionItem;
