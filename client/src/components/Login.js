import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../actions/creators";
import { useHistory } from "react-router-dom";
import MessageBox from "./MessageBox";

function Login({ login }) {
  const history = useHistory();
  const [state, setState] = useState({
    password: "",
    email: "",
  });
  const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    login(state.email, state.password, history);
  };
  return (
    <>
      <MessageBox />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={state.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleInputChange}
        />
        <button className="submit-btn">Submit</button>
      </form>
    </>
  );
}

export default connect(null, { login })(Login);
