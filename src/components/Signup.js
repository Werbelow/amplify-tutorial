import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import BackHome from "./BackHome";
const initialState = {
  email: "",
  password: "",
};
const Signup = () => {
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  function onChangeText(e) {
    e.persist();
    setFormState((currentState) => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSignup(e) {
    e.preventDefault();
    const { email, password } = formState;
    if (!email || !password) return;
    setLoading(true);
    try {
      await Auth.signUp({
        username: email,
        email,
        password,
        attributes: {
          email,
        },
      });
      setLoading(false);
      history.push("/confirm", { email });
    } catch (error) {
      setLoading(false);
      console.log("error signing up:", error);
    }
  }
  return (
    <>
      <div className="card">
        {loading ? (
          <p>signing up....</p>
        ) : (
          <form onSubmit={handleSignup}>
            <h1 className="heading">signup</h1>
            <div>
              <input
                placeholder="email (ron@pawnee.gov)"
                name="email"
                type="email"
                onChange={onChangeText}
                className="ask"
              />
              <input
                placeholder="password"
                name="password"
                type="password"
                onChange={onChangeText}
                className="ask"
              />
            </div>
            <div className="flex-center">
              <button type="submit">signup</button>
            </div>
          </form>
        )}
      </div>
      <BackHome />
    </>
  );
};
export default Signup;
