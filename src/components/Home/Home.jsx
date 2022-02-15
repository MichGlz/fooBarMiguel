import "./Home.scss";
import Login from "../helpers/Login/Login";
import { useEffect } from "react";
export default function Home(props) {
  if (props.isCustomer) {
    return <Login {...props} />;
  } else {
    return <div className="Home"></div>;
  }
}
