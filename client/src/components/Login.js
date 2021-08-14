import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { backendURL } from "../sharedVariables";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // console.log('test')
      const body = { email, password };
      const response = await fetch(`${backendURL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        // console.log(parseRes)
        // set token in localStorage
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("login successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1>Login</h1>
      <form className="text-center my-5" onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <button className="btn btn-success w-100">Submit</button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  );
};
export default Login;
