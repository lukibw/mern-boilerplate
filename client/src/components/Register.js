import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../actions/creators";
import { useHistory } from "react-router-dom";
import MessageBox from "./MessageBox";

function Register({ register }) {
  const history = useHistory();
  const [state, setState] = useState({
    username: "",
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
    register(state.username, state.email, state.password, history);
  };
  return (
    <>
      <MessageBox />
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={state.username}
          placeholder="Username"
          onChange={handleInputChange}
        />
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
          value={state.password}
          placeholder="Password"
          onChange={handleInputChange}
        />
        <button className="submit-btn">Submit</button>
      </form>
    </>
  );
}

export default connect(null, { register })(Register);
