import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { API, Hub } from "aws-amplify";
// import all of our components
import Ask from "./components/Ask";
import Question from "./components/Question";
import QuestionItem from "./components/QuestionItem";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Confirm from "./components/Confirm";

// import our query from the generated GraphQL
import { questionsByDate } from "./graphql/queries";
import "./styles/main.scss";

import { fetchUser } from "./auth";

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const user = await fetchUser();
    setUser(user);
  }

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

  // listen for auth changes and act accordingly
  Hub.listen("auth", (data) => {
    const { payload } = data;
    if (payload.event === "signOut") {
      setUser(null);
    } else if (payload.event === "signIn") {
      setUser(payload.data);
    }
  });

  return (
    <Router>
      <NavBar user={user} />
      <div className="container">
        <Switch>
          <Route path="/ask">
            <Ask setSubmittingQuestion={setSubmittingQuestion} />
          </Route>
          <Route path="/question/:id">
            <Question user={user} setSubmittingAnswer={setSubmittingAnswer} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/confirm">
            <Confirm />
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
