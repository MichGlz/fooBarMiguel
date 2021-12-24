import "./Customer.scss";
import "../helpers/BeersMenu/BeersMenu.jsx";
import TimeToClose from "../helpers/TimeToClose/TimeToClose";
import React, { useEffect, useState } from "react";
import BeersMenu from "../helpers/BeersMenu/BeersMenu.jsx";

function Beers(props) {
  const allOrders = [...props.serving, ...props.queue];
  const width = props.isFullScreen ? 45 : 45 * 0.8;
  const style = {
    transform: `translateX(calc(${width * allOrders.length}px - 100%))`,
  };

  return (
    <section className="Beers">
      <div className="beerPx" style={style}></div>
    </section>
  );
}

export default function Customer(props) {
  if (!props.taps) {
    return null;
  }

  if (!props.isCustomer) {
    props.setIsCustomer(true);
  }

  const [isFullScreen, setIsFullScreen] = useState(false);

  const styleBtn = {
    background: `url(./assets/fullscreen${isFullScreen ? "Off" : "On"}.svg)`,
  };

  useEffect(() => {
    const customerPage = document.querySelector(".customer-wrapper");
    const fullScreenElement = document.fullscreenElement;

    if (isFullScreen) {
      customerPage.requestFullscreen().catch((e) => {
        console.log(e);
      });
    } else if (fullScreenElement) {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  const ordersReady = !isFullScreen ? [...props.ordersReady].slice(0, 7) : [...props.ordersReady];
  const readyMap = ordersReady.map((order) => order.id && <li key={order.id}>{order.id}</li>);

  return (
    <div className="customer-wrapper">
      <div className="Customer">
        <TimeToClose now={props.now} isHappyHour={props.isHappyHour} isOpen={props.isOpen} isMobile={props.isMobile} />
        <div className="Beers-wrapper">
          <h2>Queue</h2> <Beers {...props} isFullScreen={isFullScreen} />
        </div>

        {!props.isMobile && <BeersMenu products={props.products} isHappyHour={props.isHappyHour} />}

        <aside>
          <h2>Orders Ready</h2>
          <ul className="orders-ready">{readyMap}</ul>
        </aside>
        {!props.isMobile && <button id="fullscreen" onClick={() => setIsFullScreen(!isFullScreen)} style={styleBtn}></button>}
      </div>
    </div>
  );
}
