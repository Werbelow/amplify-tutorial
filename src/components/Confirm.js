import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
const initState = {
  email: "",
  code: "",
};
const Confirm = () => {
  const history = useHistory();
  const location = useLocation();
  const [formState, setFormState] = useState(initState);
  useEffect(() => {
    if (location.state && location.state.email) {
      setFormState((currentState) => ({
        ...currentState,
        email: location.state.email,
      }));
    }
  }, []);
  function onChangeText(e) {
    e.persist();
    setFormState((currentState) => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }));
  }
  async function confirmSignUp(e) {
    e.preventDefault();
    const { email, code } = formState;
    if (!code || !email) return;
    try {
      await Auth.confirmSignUp(email, code);
      history.push("/login", { email });
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }
  return (
    <div className="card">
      <form onSubmit={confirmSignUp}>
        <p style={{ marginBottom: "1rem" }}>
          please check your email for a confirmation code
        </p>
        <input
          placeholder="email"
          name="email"
          type="email"
          onChange={onChangeText}
          className="ask"
          value={formState.email}
        />
        <input
          placeholder="confirmation code"
          name="code"
          type="text"
          onChange={onChangeText}
          className="ask"
        />
        <div className="flex-center">
          <button type="submit">confirm</button>
        </div>
      </form>
    </div>
  );
};
export default Confirm;
