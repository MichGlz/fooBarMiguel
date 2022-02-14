import "./Manager.scss";
import Inventory from "../helpers/Inventory/Inventory";
import Workers from "../helpers/Workers/Workers";
import TopBeer from "../helpers/Ranking/Ranking";
import Sales from "../helpers/Sales/Sales";
import Login from "../helpers/Login/Login";
import Spiner from "../helpers/Spiner/Spiner";
import React, { useState } from "react";

export default function Manager(props) {
  const [access, setAccess] = useState();
  if (!props.bartenders) {
    return <Spiner />;
  }
  if (!access) {
    return <Login setAccess={setAccess} />;
  }

  return (
    <>
      <section className="manager">
        <div className="header">
          <h2>Managers overview</h2>
        </div>
        <div>
          <Sales className="sales" {...props} />
          <Workers className="workers" {...props} />
          <Inventory className="inventory" {...props} />
        </div>
        <TopBeer className="topBeer" {...props} />
      </section>
    </>
  );
}
