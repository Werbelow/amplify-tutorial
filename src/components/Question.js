import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API } from "aws-amplify";
import { getQuestion } from "../graphql/queries";
import { createAnswer } from "../graphql/mutations";
import BackHome from "./BackHome";
const Question = ({ user, setSubmittingAnswer }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});
  const [answerInput, setAnswerInput] = useState("");

  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line
  }, [id]);

  async function fetchQuestion() {
    try {
      const question = await API.graphql({
        query: getQuestion,
        variables: {
          id,
        },
      });
      setQuestion(question.data.getQuestion);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("FETCH QUESTION ERROR ", err);
    }
  }

  function onChangeAnswer(e) {
    e.persist();
    setAnswerInput(e.target.value);
  }

  async function handleAddAnswer(e) {
    e.preventDefault();
    const answerInfo = {
      questionID: question.id,
      content: answerInput,
    };
    setSubmittingAnswer(true);
    try {
      await API.graphql({
        query: createAnswer,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: answerInfo,
        },
      });
      setSubmittingAnswer(false);
      setAnswerInput("");
      fetchQuestion();
    } catch (err) {
      setSubmittingAnswer(false);
      if (err) {
        console.log("ERROR ", err.errors);
      }
    }
  }

  return (
    <>
      <div className="card">
        {!loading && (
          <>
            <h1 className="heading">{question.content}</h1>
            <p className="sub-text">
              {(question.answer && question.answer.content) ||
                "This question has not been answered yet"}
            </p>
            {user && question.answer === null && (
              <div className="answer-section">
                <h3 className="sub-heading">add answer</h3>
                <form
                  style={{ display: "flex", alignItems: "stretch" }}
                  onSubmit={handleAddAnswer}
                >
                  <input
                    placeholder="super helpful answer"
                    onChange={onChangeAnswer}
                    value={answerInput}
                    style={{ flex: 1 }}
                  />
                  <button type="submit">add answer</button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
      <BackHome />
    </>
  );
};
export default Question;
