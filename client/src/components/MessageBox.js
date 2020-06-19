import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CLOSE_MESSAGE } from "../actions/types";

import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function MessageBox({ message, messageType, dispatch }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (message !== null) {
      setOpen(true);
    }
  }, [message]);
  return (
    <Snackbar
      disableWindowBlurListener={true}
      open={open}
      autoHideDuration={messageType === "error" ? 4000 : 1500}
      onClose={() => setOpen(false)}
      onExited={() => dispatch({ type: CLOSE_MESSAGE })}
    >
      <Alert
        variant="filled"
        severity={messageType}
        onClose={() => setOpen(false)}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = state => {
  return {
    message: state.auth.message,
    messageType: state.auth.messageType,
  };
};

export default connect(mapStateToProps)(MessageBox);
