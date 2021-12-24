import "./Bartender.scss";
import Taps from "../helpers/Taps/Taps";
import React from "react";
import TimeToClose from "../helpers/TimeToClose/TimeToClose";
import OrderList from "../helpers/OrderList/OrderList";
import Bulb from "../helpers/Bulb/Bulb";
import { useState } from "react";

function Keg(props) {
  const beer = props.name.split(" ").slice(0, 2).join(" ");
  return (
    <li className="Keg">
      <Bulb {...props} />
      {beer}: {props.amount} left
    </li>
  );
}

function Depot(props) {
  const [sortBy, setSortBy] = useState("amount");
  const [direction, setDirection] = useState(1);

  function sorting(e) {
    if (e.currentTarget.dataset.sortDirection === "asc") {
      e.target.dataset.sortDirection = "desc";
      setDirection(-1);
    } else {
      e.target.dataset.sortDirection = "asc";
      setDirection(1);
    }

    setSortBy(e.currentTarget.dataset.sort);
  }

  function sortBeers(a, b) {
    if (a[sortBy] > b[sortBy]) {
      return 1 * direction;
    } else {
      return -1 * direction;
    }
  }

  let displayList = [...props.storage].sort(sortBeers);

  const kegs = displayList.map((keg, i) => <Keg key={(i < 9 ? "keg0" : "keg") + (i + 1)} {...keg} />);
  return (
    <section className="Depot">
      <h2>Inventory</h2>
      <div className="sorting-wrapper">
        <h4>{direction === 1 ? "↓ " : "↑ "} Sort by:</h4>
        <button data-sort-direction="asc" data-sort="amount" onClick={sorting} style={sortBy === "amount" ? { color: "red" } : { color: "white" }}>
          Amount
        </button>
        |
        <button data-sort-direction="asc" data-sort="name" onClick={sorting} style={sortBy === "name" ? { color: "red" } : { color: "white" }}>
          Name
        </button>
      </div>
      <ul>{kegs}</ul>
    </section>
  );
}

export default function Bartender(props) {
  if (!props.taps) {
    return null;
  }

  return (
    <div className="Bartender">
      <TimeToClose now={props.now} isHappyHour={props.isHappyHour} isOpen={props.isOpen} />
      <Taps bartenders={props.bartenders} taps={props.taps} />
      <Depot {...props} />
      <OrderList {...props} />
    </div>
  );
}
