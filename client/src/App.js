import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { loadUser } from "./actions/creators";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import MessageBox from "./components/MessageBox";

import Container from "@material-ui/core/Container";

function App() {
  useEffect(() => {
    // Try to load user
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Provider store={store}>
        <Container maxWidth="sm">
          <MessageBox />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Container>
      </Provider>
    </Router>
  );
}

export default App;
