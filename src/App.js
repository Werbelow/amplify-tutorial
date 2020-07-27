import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { API } from "aws-amplify";
// import all of our components
import Ask from "./components/Ask";
import Question from "./components/Question";
import QuestionItem from "./components/QuestionItem";
import Hero from "./components/Hero";
// import our query from the generated GraphQL
import { questionsByDate } from "./graphql/queries";
import "./styles/main.scss";
function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  useEffect(() => {
    fetchQuestions();
    // refetch data when a question or answer have been submitted
  }, [submittingAnswer, submittingQuestion]);
  // fetch our questions from the API via Amplify
  async function fetchQuestions() {
    try {
      const questionData = await API.graphql({
        query: questionsByDate,
        variables: {
          type: "QUESTION",
          sortDirection: "DESC",
        },
      });
      const questionsArray = questionData.data.questionsByDate.items;
      setAllQuestions(questionsArray);
    } catch (err) {
      console.log("FETCH QUESTIONS ERROR:: ", err);
    }
  }
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/ask">
            <Ask setSubmittingQuestion={setSubmittingQuestion} />
          </Route>
          <Route path="/question/:id">
            <Question setSubmittingAnswer={setSubmittingAnswer} />
          </Route>
          <Route path="/">
            <Hero />
            <div className="card">
              {allQuestions.map((question) => (
                <QuestionItem questionPost={question} key={question.id} />
              ))}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
