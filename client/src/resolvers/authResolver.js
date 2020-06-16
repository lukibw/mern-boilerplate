import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  USER_NOT_LOADED,
  CLOSE_MESSAGE,
} from "../actions/types";

const initialState = {
  user: null,
  message: null,
  messageType: null,
  isAuthenticated: false,
  loading: false,
};

export const authResolver = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_NOT_LOADED:
      return {
        ...state,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        messageType: "success",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        messageType: "success",
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        message: action.payload.message,
        messageType: "error",
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        message: action.payload.message,
        messageType: "success",
      };
    case CLOSE_MESSAGE:
      return {
        ...state,
        message: null,
        messageType: null,
      };
    default:
      return state;
  }
};
