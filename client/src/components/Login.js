import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../actions/creators";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { LOGIN_FAIL } from "../actions/types";

export const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  box: {
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

function Login({ login, dispatch }) {
  const classes = useStyles();
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
    if (state.email !== "" && state.password !== "") {
      dispatch(login(state.email, state.password, history));
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          message: "Please enter email and password",
        },
      });
    }
  };
  return (
    <Container maxWidth="xs">
      <div className={classes.box}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
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
    login,
    dispatch,
  };
};

export default connect(null, mapDispatchToProps)(Login);
