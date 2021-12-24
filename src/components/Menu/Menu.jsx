import Basket from "../helpers/Basket/Basket";
import ProductList from "../helpers/ProductList/ProductList";
import ModalOrderReady from "../helpers/ModalOrderReady/ModalOrderReady";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import CartBtn from "../helpers/CartBtn/CartBtn";

import "./Menu.scss";
export default function Menu(props) {
  if (!props.products) {
    return null;
  }
  const beers = props.products.filter((beer) => beer.onTap);
  const [basket, setBasket] = useState([]);
  const [ordersID, setOrdersID] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [isYourOrderReady, setIsYourOrderReady] = useState(false);
  const [yourOrderReady, setYourOrderReady] = useState({});

  function addToBasket(product) {
    setBasket(function (oldBasket) {
      if (basket.filter((element) => element.name === product.name).length > 0) {
        return oldBasket.map((item) => {
          const copy = { ...item };

          if (copy.name === product.name) {
            copy.amount = Number(copy.amount) + Number(product.amount);
          }

          return copy;
        });
      } else {
        const newBasket = oldBasket.concat(product);

        return newBasket;
      }
    });
  }

  function resetBasket() {
    setBasket([]);
  }

  function addMoreBeer(amount, productName) {
    setBasket(function (oldBasket) {
      return oldBasket.map((item) => {
        const copy = { ...item };
        if (copy.name === productName) {
          copy.amount = amount;
        }
        return copy;
      });
    });
  }

  function deleteBeer(productName) {
    setBasket(function (oldBasket) {
      return oldBasket.map((item) => {
        const copy = { ...item };
        if (copy.name === productName) {
          copy.amount = 0;
        }
        return copy;
      });
    });
  }

  function increaseAmount(productName) {
    setBasket(function (oldBasket) {
      return oldBasket.map((item) => {
        const copy = { ...item };
        if (copy.name === productName) {
          copy.amount++;
        }
        return copy;
      });
    });
  }

  function decreaseAmount(productName) {
    setBasket(function (oldBasket) {
      return oldBasket.map((item) => {
        const copy = { ...item };
        if (copy.name === productName) {
          copy.amount--;
        }
        return copy;
      });
    });
  }

  function addID(orderID) {
    setOrdersID((oldArr) => {
      const copy = [orderID, ...oldArr];
      return copy;
    });
  }

  useEffect(() => {
    ordersID.forEach((order) => {
      if (props.ordersReady.find((orderReady) => orderReady.id === order.id)) {
        const orderReady = props.ordersReady.find((orderReady) => orderReady.id === order.id);
        setYourOrderReady({ id: orderReady.id, bartender: orderReady.bartender, customer: order.customer });
        setIsYourOrderReady(true);
        // window.alert("your order " + ID + " is ready");

        setOrdersID((oldArr) => {
          const copy = oldArr.filter((oldOrder) => oldOrder.id !== order.id);
          return copy;
        });
      }
    });
  }, [props.ordersReady]);

  const style = {
    position: "absolute",
    top: "0",
  };

  if (props.isMobile) {
    return (
      <div className="Layout">
        {isYourOrderReady && <ModalOrderReady {...yourOrderReady} setIsYourOrderReady={setIsYourOrderReady} />}
        {props.isHappyHour && <Confetti width={window.innerWidth} height={window.innerHeight} className="confetti" />}
        {props.cart ? (
          <ProductList addToBasket={addToBasket} beers={beers} isHappyHour={props.isHappyHour} />
        ) : (
          <Basket
            style={props.cart && style}
            addID={addID}
            resetBasket={resetBasket}
            deleteBeer={deleteBeer}
            decreaseAmount={decreaseAmount}
            increaseAmount={increaseAmount}
            addMoreBeer={addMoreBeer}
            basket={basket}
            ordersID={ordersID}
            customerName={customerName}
            setCustomerName={setCustomerName}
          />
        )}
        <CartBtn basket={basket} cart={props.cart} setCart={props.setCart} />
      </div>
    );
  } else {
    return (
      <div className="Layout">
        {isYourOrderReady && <ModalOrderReady {...yourOrderReady} setIsYourOrderReady={setIsYourOrderReady} />}
        {props.isHappyHour && <Confetti width={window.innerWidth} height={window.innerHeight} className="confetti" />}
        <div className="produclist-wrapper">
          <ProductList addToBasket={addToBasket} beers={beers} isHappyHour={props.isHappyHour} />
        </div>
        <Basket
          style={props.cart && style}
          addID={addID}
          resetBasket={resetBasket}
          deleteBeer={deleteBeer}
          decreaseAmount={decreaseAmount}
          increaseAmount={increaseAmount}
          addMoreBeer={addMoreBeer}
          basket={basket}
          ordersID={ordersID}
          customerName={customerName}
          setCustomerName={setCustomerName}
        />
      </div>
    );
  }
}
