import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADING,
  USER_LOADED,
  LOGOUT_SUCCESS,
  USER_NOT_LOADED,
} from "./types";

axios.defaults.withCredentials = true;

export const loadUser = () => dispatch => {
  dispatch({
    type: USER_LOADING,
  });
  axios.get("http://localhost:5000/users/user", getConfig()).then(res => {
    if (res.data.user) {
      dispatch({
        type: USER_LOADED,
        payload: {
          user: res.data.user,
        },
      });
    } else {
      dispatch({
        type: USER_NOT_LOADED,
      });
    }
  });
};

export const login = (email, password, history) => dispatch => {
  const body = JSON.stringify({ email, password });
  axios
    .post("http://localhost:5000/users/login", body, getConfig())
    .then(res => {
      if (res.data.user) {
        // Successfully logged in
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: res.data.user,
            message: res.data.message,
          },
        });
        history.push("/"); // Change if you want
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            message: res.data.message,
          },
        });
      }
    });
};

export const register = (username, email, password, history) => dispatch => {
  const body = JSON.stringify({ username, email, password });
  axios
    .post("http://localhost:5000/users/register", body, getConfig())
    .then(res => {
      if (res.data.user) {
        // Successfully registered
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            message: res.data.message,
          },
        });
        history.push("/"); // Change if you want
      } else {
        dispatch({
          type: REGISTER_FAIL,
          payload: {
            message: res.data.message,
          },
        });
      }
    });
};

export const logout = history => dispatch => {
  axios.get("http://localhost:5000/users/logout", getConfig()).then(res => {
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: {
        message: res.data.message,
      },
    });
    history.push("/");
  });
};

const getConfig = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return config;
};
