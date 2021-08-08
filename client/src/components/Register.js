import React, { Fragment, useState } from "react";
import {Link} from 'react-router-dom'

const Register = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = inputs;

  const onChange = (e) => setInputs({...inputs, [e.target.name]: e.target.value});

  const onSubmitForm = async (e) => {
      //prevent refresh of page
      e.preventDefault()
      try {
        const body = {name, email, password}
        const response = await fetch('http://localhost:5000/auth/register',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        })
        const parseRes = await response.json()
        // console.log(parseRes)

        localStorage.setItem('token', parseRes.token)

        setAuth(true)
      } catch (err){
        console.error(err.message)
      }
  }
  
  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={e=> onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={e=> onChange(e)}
        ></input>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={e=> onChange(e)}
        ></input>
        <button className="btn btn-success w-100">Submit</button>
      </form>
      <Link to='/login'>Login</Link>
    </Fragment>
  );
};
export default Register;
