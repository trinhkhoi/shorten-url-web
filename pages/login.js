import React, { useEffect, useState} from 'react'
import Router from "next/router";
import axios from 'axios'

function Login() {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [userNameMessage, setUserNameMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  function onLogin(e) {
    e.preventDefault()
    clearErrorMessage()
    if (handleValidation()) {
      axios.post(`http://localhost:8080/public/customer/login`, {
        userName,
        password
      }).then(function (response) {
        if (response.status == 200) {
          console.log(response.data.data);
          localStorage.setItem('accessToken', response.data.data)
          Router.push("/") 
        }
      }).catch(function (error) {
        console.log(error);
        setMessage(error.response.data.message)
      });
    }
  }

  function clearErrorMessage() {
    setMessage('')
    setUserNameMessage('')
    setPasswordMessage('')
  }
  function handleValidation() {
    var isValid = true;
    if (!userName) {
      setUserNameMessage('The username is not empty')
      isValid = false
    }
    if (!password) {
      setPasswordMessage('The password is not empty')
      isValid = false
    }
    return isValid
  }
  return (
    <div> 
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="register-form mt-5 px-3">
            <label className="text-danger">{message}</label>
            <form action="#" method="POST" onSubmit={onLogin}>
              <div className="form-group text-left mb-4">
                <label><i className="lni lni-user text-danger">{userNameMessage}</i></label>
                <input className="form-control" id="username" type="text" name="username" placeholder="Please enter your username" onChange={(e) => setUserName(e.target.value)}/>
              </div>
              <div className="form-group text-left mb-4">
                <label><i className="lni lni-lock text-danger">{passwordMessage}</i></label>
                <input className="form-control" id="password" type="password" name="password" placeholder="Please enter your password" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button className="btn btn-primary w-50">Login</button>
              <a href="/register">(Register)</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login