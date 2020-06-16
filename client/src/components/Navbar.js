import React, { useMemo } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/creators";

function Navbar({ isAuthenticated, user, logout }) {
  const location = useLocation();
  const history = useHistory();
  const nav = useMemo(
    () => (
      <nav className="nav">
        <div
          className={location.pathname === "/" ? "nav-item-active" : "nav-item"}
        >
          <Link to="/">Home</Link>
        </div>
        {!isAuthenticated ? (
          <>
            <div
              className={
                location.pathname === "/login" ? "nav-item-active" : "nav-item"
              }
            >
              <Link to="/login">Login</Link>
            </div>
            <div
              className={
                location.pathname === "/register"
                  ? "nav-item-active"
                  : "nav-item"
              }
            >
              <Link to="/register">Register</Link>
            </div>
          </>
        ) : (
          <>
            <div className="nav-item" onClick={() => logout(history)}>
              Logout
            </div>
            <div className="nav-item" style={{ float: "right" }}>
              {user.username}
            </div>
          </>
        )}
      </nav>
    ),
    [location.pathname, history, isAuthenticated, logout, user]
  );
  return <>{nav}</>;
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
