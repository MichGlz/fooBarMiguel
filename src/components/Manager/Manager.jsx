import "./Manager.scss";
import Inventory from "../helpers/Inventory/Inventory";
import Workers from "../helpers/Workers/Workers";
import TopBeer from "../helpers/Ranking/Ranking";
import Sales from "../helpers/Sales/Sales";
import Login from "../helpers/Login/Login";
import Spiner from "../helpers/Spiner/Spiner";
import React, { useState } from "react";

export default function Manager(props) {
  if (!props.bartenders) {
    return <Spiner />;
  }
  if (!props.fullAccess) {
    return <Login setAccess={props.setAccess} setFullAccess={props.setFullAccess} />;
  }

  return (
    <>
      <section className="manager">
        <div className="header">
          <h2>Managers overview</h2>
          <button
            className="log-out"
            onClick={() => {
              props.setFullAccess(false);
            }}
          >
            Log Out
          </button>
        </div>
        <div>
          <Sales className="sales" {...props} />
          <Workers className="workers" {...props} />
          <Inventory className="inventory" {...props} />
          <TopBeer isAChart={true} {...props} />
        </div>
        <TopBeer className="topBeer" {...props} />
      </section>
    </>
  );
}
