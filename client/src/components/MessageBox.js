import React from "react";
import { connect } from "react-redux";
import { CLOSE_MESSAGE } from "../actions/types";

function MessageBox({ message, messageType, dispatch }) {
  if (!message) return null;
  return (
    <div className={messageType === "success" ? "success-msg" : "error-msg"}>
      {message}
      <div
        className="close-msg"
        onClick={() => dispatch({ type: CLOSE_MESSAGE })}
      >
        &times;
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    message: state.auth.message,
    messageType: state.auth.messageType,
  };
};

export default connect(mapStateToProps)(MessageBox);
