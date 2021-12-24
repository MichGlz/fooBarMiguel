//import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  
//   <Auth0Provider
//   domain={domain}
//   client= {clientId}
//   redirectUri={window.location.origin}
// >
//   <Manager/>
// </Auth0Provider>,
  document.getElementById("root")
);
