import React, { Fragment, useState, useEffect } from "react";

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Container } from "react-bootstrap";

//Components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { backendURL } from "./sharedVariables";
toast.configure()

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const setAuth = boolean => {
    setisAuthenticated(boolean)
  }

  //pass jwt token to middleware in backend to check if authorized
  async function isAuth() {
    try {
      const response = await fetch(`${backendURL}auth/is-verify`,{
        method: 'GET',
        headers: {token: localStorage.token}
      });


      const parseRes = await response.json()

      // console.log(parseRes)

      parseRes === true ? setisAuthenticated(true): setisAuthenticated(false)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect (()=>{
    console.log(isAuthenticated)
    isAuth()
  })

  return (
    <Fragment>
      <Router>
        <Container>
          <Switch>
          <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
                  <Redirect to="/login" />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </Container>
      </Router>
    </Fragment>
  );
}

export default App;
