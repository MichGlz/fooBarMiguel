import React from "react";
import "./Sales.scss";

export default function Sales(props) {
  if (!props.products) {
    return null;
  }
  const namePrice = props.products.map((beer) => {
    const name = beer.name.toLowerCase().split(" ").join("");
    const total = props.ranking[name] * beer.price();
    return total;
  });

  const initialValue = 0;
  let sum = namePrice.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue;
  }, initialValue);

  // console.log(namePrice);
  // console.log(sum);

  return (
    <div className="sales">
      <div className="salesHeader">
        <h3>Todays sales</h3>
      </div>
      <div className="figures">
        <div>
          <h4>Total income</h4>
          <p>{sum} kr</p>
        </div>
        <div>
          <h4>Total Orders</h4>
          <p>{props.dayOrders}</p>
        </div>
        <div>
          <h4>Average order income</h4>
          <p>{Math.round(sum / props.dayOrders).toFixed(0)} kr</p>
        </div>
      </div>
    </div>
  );
}
