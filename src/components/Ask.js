import React, { useState } from "react";
import { API } from "aws-amplify";
import { createQuestion } from "../graphql/mutations";
import BackHome from "./BackHome";
const Ask = ({ setSubmittingQuestion }) => {
  const [question, setQuestion] = useState("");
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);
  function onChangeText(e) {
    e.persist();
    setQuestion(e.target.value);
  }
  async function handleAsk(e) {
    e.preventDefault();
    try {
      if (!question) return;
      setSaving(true);
      setSubmittingQuestion(true);
      // Save the question to our DB
      await API.graphql({
        query: createQuestion,
        variables: {
          input: {
            content: question,
            type: "QUESTION",
          },
        },
      });
      setSaving(false);
      setSent(true);
      setSubmittingQuestion(false);
      setQuestion("");
    } catch (err) {
      setSent(false);
      setSaving(false);
      setSubmittingQuestion(false);
      console.log("ERROR SAVING QUESTION:: ", err);
    }
  }
  return (
    <>
      <div className="card">
        {saving && <p>sending question...</p>}
        {!sent ? (
          <form onSubmit={handleAsk}>
            <h1 className="heading">ask me anything</h1>
            <div>
              <input
                placeholder="be nice"
                name="question"
                onChange={onChangeText}
                className="ask"
              />
            </div>
            <div className="flex-center">
              <button type="submit">ask</button>
            </div>
          </form>
        ) : (
          <p className="heading">question sent</p>
        )}
      </div>
      <BackHome />
    </>
  );
};
export default Ask;
