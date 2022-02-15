import React, { useState } from "react";
import "./Login.scss";

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const usernameOriginal = "manager";
  const passwordOriginal = "test123";

  function handleSubmit(e) {
    e.preventDefault();
    const access = username === usernameOriginal && password === passwordOriginal;
    if (access) {
      console.log("it's a match");
      if (props.isCustomer) {
        props.setIsCustomer(false);
      } else {
        props.setAccess(access);
      }
    } else {
      alert("The password or user are not correct");
    }
  }

  return (
    <div className="login-modal">
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" autoComplete="username" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div>
            <button className="submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
