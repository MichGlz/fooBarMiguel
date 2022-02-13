import "./CartBtn.scss";
import { NavLink } from "react-router-dom";

export default function CartBtn(props) {
  const initialValue = 0;
  let total = props.basket.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.amount;
  }, initialValue);

  return total > 0 ? (
    <NavLink
      to="/Menu"
      className="CartBtn"
      onClick={() => {
        console.log("hola");
        props.setCart(!props.cart);
      }}
    >
      <span>{props.cart ? "X" : total}</span>
    </NavLink>
  ) : null;
}
