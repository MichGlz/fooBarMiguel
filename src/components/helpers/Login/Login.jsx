import React, { useEffect, useState } from "react";
import "./Login.scss";
import fetchUser from "../../../modules/fetchUser";
import Spiner from "../Spiner/Spiner";

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  const [isFetching, setIsFetchin] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    fetchUser(username, setUser, setIsFetchin);
    setIsFetchin(true);
  }

  useEffect(() => {
    if (user) {
      const access = username === user.username && password === user.password;
      console.log(access);
      if (access) {
        console.log("it's a match");
        if (user.level === 2) {
          if (props.setIsCustomer) {
            props.setIsCustomer(false);
            props.setAccess(true);
          } else {
            alert("you have not access to this page");
          }
        } else if (user.level === 1) {
          if (props.setIsCustomer) {
            props.setIsCustomer(false);
          }
          props.setFullAccess(true);
        }
      } else {
        alert("The password or user are not correct");
      }
    }
  }, [user]);

  return (
    <div className="login-modal">
      {isFetching && <Spiner />}
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
