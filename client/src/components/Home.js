import React from "react";

import { useStyles } from "./Login";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

function Home({ user }) {
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <div className={classes.box}>
        <Typography component="h1" variant="h5">
          MERN Boilerplate
        </Typography>
        <p>
          MongoDB, Express, React/Redux, Node starter with basic passportjs
          authentication
        </p>
        {user && (
          <Typography variant="h6" style={{ color: "gray" }}>
            Hello {user.username}
          </Typography>
        )}
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Home);
