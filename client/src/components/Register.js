import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../actions/creators";
import { useHistory } from "react-router-dom";

import { useStyles } from "./Login";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { REGISTER_FAIL } from "../actions/types";

function Register({ register, dispatch }) {
  const classes = useStyles();
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
    if (state.email !== "" && state.password !== "" && state.username !== "") {
      dispatch(register(state.username, state.email, state.password, history));
    } else {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          message: "Please enter username, email and password",
        },
      });
    }
  };
  return (
    <Container maxWidth="xs">
      <div className={classes.box}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={state.username}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={state.email}
            onChange={handleInputChange}
          />
          <TextField
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            value={state.password}
            onChange={handleInputChange}
          />
          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    register,
    dispatch,
  };
};

export default connect(null, mapDispatchToProps)(Register);
