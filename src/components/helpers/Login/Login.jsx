import React, { useEffect, useState } from "react";
import "./Login.scss";
import fetchUser from "../../../modules/fetchUser";

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();

  const usernameOriginal = "admin";
  const passwordOriginal = "1234";

  function handleSubmit(e) {
    e.preventDefault();
    fetchUser(username, setUser);
  }

  useEffect(() => {
    if (user) {
      const access = username === user.username && password === user.password;
      console.log(access);
      if (access) {
        console.log("it's a match");
        if (props.isCustomer) {
          props.setIsCustomer(false);
        } else {
          props.setAccess(true);
        }
      } else {
        alert("The password or user are not correct");
      }
    }
  }, [user]);

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
