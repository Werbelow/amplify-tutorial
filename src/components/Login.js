import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import BackHome from "./BackHome";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const { state: { email } = {} } = location;
    if (email) {
      setFormState((currentState) => ({
        ...currentState,
        email,
      }));
    }
    // eslint-disable-next-line
  }, []);
  function onChangeText(e) {
    e.persist();
    setFormState((currentState) => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleLogin(e) {
    e.preventDefault();
    const { email, password } = formState;
    if (!email || !password) return;
    setLoading(true);
    try {
      await Auth.signIn({
        username: email,
        email,
        password,
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      console.log("error signing up:", error);
    }
  }
  return (
    <>
      <div className="card">
        {loading ? (
          <p>logging in...</p>
        ) : (
          <form onSubmit={handleLogin}>
            <h1 className="heading">login</h1>
            <div>
              <input
                placeholder="email (ron@pawnee.gov)"
                name="email"
                type="email"
                onChange={onChangeText}
                value={formState.email}
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
              <button type="submit">login</button>
            </div>
          </form>
        )}
      </div>
      <BackHome />
    </>
  );
};
export default Login;
