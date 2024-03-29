import "./App.scss";
import "./index.scss";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Manager from "./components/Manager/Manager";
import Customer from "./components/Customer/Customer";
import Barteneder from "./components/Bartender/Bartender";
import Home from "./components/Home/Home";
import Footer from "./components/helpers/Footer/Footer";
import Header from "./components/helpers/Header/Header";
import Spiner from "./components/helpers/Spiner/Spiner";
import timeManager from "./modules/timeManager";
import BeerTypes from "./beertypes.json";
import FooBarData from "./foobardata.json";

function App() {
  const [windowDimension, setWindowDimension] = useState(null);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [isCustomer, setIsCustomer] = useState(false);
  const [now, setNow] = useState(new Date().getTime());
  const [ordersReady, setOrdersReady] = useState([]);
  const [cart, setCart] = useState(false);
  const [isHappyHour, setIsHappyHour] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [ranking, setRanking] = useState({
    elhefe: 0,
    fairytaleale: 0,
    githop: 0,
    hollabacklager: 0,
    hoppilyeverafter: 0,
    mowintime: 0,
    row26: 0,
    ruinedchildhood: 0,
    sleighride: 0,
    steampunk: 0,
  });

  const [oldServing, setOldServing] = useState([]);
  const [newServing, setNewServing] = useState([]);
  const [dayOrders, setDayOrders] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  // const [orderReady, setOrderRedady] = useState({});

  //---------consts moved from menu---------
  const [ordersID, setOrdersID] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [isYourOrderReady, setIsYourOrderReady] = useState(false);
  const [yourOrderReady, setYourOrderReady] = useState({});
  //---------------------------------------

  //-------------login----------------
  const [access, setAccess] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  //----------------------------------

  const isMobile = windowDimension <= 640;

  const beerBasePrice = 40;

  function changeCartState(state) {
    setCart(state);
  }

  //----------fetch beer types---------------
  //momentary solution before server is working
  useEffect(() => {
    //console.log("hola first useeEfect");
    //console.log(BeerTypes);
    let beerTypesJson = BeerTypes;
    //console.log(beerTypesJson);
    const beers = addStuff(beerTypesJson);
    //console.log(beers);
    setProducts(beers);
  }, []);

  // useEffect(() => {
  //   fetch("https://los-amigos.herokuapp.com/beertypes")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //       const beers = addStuff(data);
  //       console.log(beers);
  //       setProducts(beers);
  //     });
  // }, []);
  //-----------------------------------------

  //-----fetch data every 5sec---------------

  //momentary solution before server is working
  useEffect(() => {
    //console.log("hola second useeEfect");
    const data = FooBarData;
    setData(data);
    checkTaps(data);
    setNewServing(
      data.serving.map(function (order) {
        const bartender = data.bartenders.find(
          (man) => man.servingCustomer === order.id
        );
        return { ...order, bartender: bartender.name };
      })
    );
    setAllOrders([...data.queue, ...data.serving]);
  }, []);
  // useEffect(() => {
  //   const URL = "https://los-amigos.herokuapp.com/";
  //   // (1) define within effect callback scope
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(URL);
  //       const data = await res.json();
  //       setData(data);
  //       checkTaps(data);
  //       setNewServing(
  //         data.serving.map(function (order) {
  //           const bartender = data.bartenders.find(
  //             (man) => man.servingCustomer === order.id
  //           );
  //           return { ...order, bartender: bartender.name };
  //         })
  //       );
  //       setAllOrders([...data.queue, ...data.serving]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData(); // <-- (2) invoke on mount

  //   const id = setInterval(() => {
  //     fetchData(); // <-- (3) invoke in interval callback
  //   }, 5000);

  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);
  //-----------------------------------------

  //------up date now every 1sec-------------
  useEffect(() => {
    function upDateNow() {
      setNow(new Date().getTime());
    }

    upDateNow();

    const id2 = setInterval(() => {
      upDateNow();
    }, 1000);

    return () => {
      clearInterval(id2);
    };
  }, []);
  //-----------------------------------------

  useEffect(() => {
    timeManager(now, isHappyHour, setIsHappyHour, setIsOpen);
  }, [now]);

  //----------checking in serving orders for orders ready------
  useEffect(() => {
    if (oldServing.length > 0) {
      oldServing.forEach((oldOrder, i, arr) => {
        const findIt = [...newServing].find(
          (newOrder) => newOrder.id === oldOrder.id
        );

        !findIt && upDateOrdersReady(oldOrder);
        !findIt && setDayOrders(dayOrders + 1);
        i === arr.length - 1 && setOldServing([...newServing]);
      });
    } else {
      setOldServing([...newServing]);
    }
  }, [newServing]);
  //-----------------------------------------------------------

  //-----------------------
  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function checkTaps(info) {
    setProducts(function (oldProducts) {
      return oldProducts.map((item) => {
        const copy = { ...item };
        if (info.taps.filter((tap) => tap.beer === item.name).length > 0) {
          copy.onTap = true;
        } else {
          copy.onTap = false;
        }

        return copy;
      });
    });
  }

  function addStuff(data) {
    return data.map((beer, i) => {
      const copy = {
        ...beer,
        id: (i < 9 ? "b0" : "b") + (i + 1),
        onTap: false,
        price: function () {
          return Math.round(this.alc + beerBasePrice);
        },
        amount: 1,
        totalPrice: function () {
          return this.amount * this.price();
        },
      };
      return copy;
    });
  }

  function upDateOrdersReady(order) {
    if (!ordersReady.find((element) => element.id === order.id)) {
      const orderLowerCase = order.order.map((beer) =>
        beer.toLowerCase().split(" ").join("")
      );

      orderLowerCase.forEach((beer) => {
        setRanking((oldRanking) => {
          const newRanking = { ...oldRanking };
          newRanking[beer]++;
          return newRanking;
        });
      });

      setOrdersReady(function (oldOrdersReady) {
        const copy = [order, ...oldOrdersReady];
        return copy.slice(0, 10);
      });
    }
    return;
  }

  if (!data.bartenders) {
    return <Spiner />;
  } else {
    return (
      <div className="App">
        <Header
          changeCartState={changeCartState}
          cart={cart}
          isCustomer={isCustomer}
          setAccess={setAccess}
          setFullAccess={setFullAccess}
        />

        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  isCustomer={isCustomer}
                  setIsCustomer={setIsCustomer}
                  access={access}
                  setAccess={setAccess}
                  setFullAccess={setFullAccess}
                />
              }
            />
            <Route
              exact
              path="/Manager"
              element={
                <Manager
                  {...data}
                  now={now}
                  products={products}
                  ranking={ranking}
                  dayOrders={dayOrders}
                  access={access}
                  setAccess={setAccess}
                  fullAccess={fullAccess}
                  setFullAccess={setFullAccess}
                />
              }
            />
            <Route
              exact
              path="/Bartender"
              element={
                <Barteneder
                  {...data}
                  now={now}
                  upDateOrdersReady={upDateOrdersReady}
                  ordersReady={ordersReady}
                  isHappyHour={isHappyHour}
                  isOpen={isOpen}
                />
              }
            />

            <Route
              exact
              path="/Dashboard"
              element={
                <Customer
                  {...data}
                  now={now}
                  ordersReady={ordersReady}
                  isHappyHour={isHappyHour}
                  isOpen={isOpen}
                  products={products}
                  isCustomer={isCustomer}
                  setIsCustomer={setIsCustomer}
                  isMobile={isMobile}
                  ordersID={ordersID}
                  setOrdersID={setOrdersID}
                  customerName={customerName}
                  setCustomerName={setCustomerName}
                  isYourOrderReady={isYourOrderReady}
                  setIsYourOrderReady={setIsYourOrderReady}
                  yourOrderReady={yourOrderReady}
                  setYourOrderReady={setYourOrderReady}
                />
              }
            />

            <Route
              exact
              path="/Menu"
              element={
                <Menu
                  products={products}
                  cart={cart}
                  isMobile={isMobile}
                  ordersReady={ordersReady}
                  isHappyHour={isHappyHour}
                  setCart={setCart}
                  ordersID={ordersID}
                  setOrdersID={setOrdersID}
                  customerName={customerName}
                  setCustomerName={setCustomerName}
                  isYourOrderReady={isYourOrderReady}
                  setIsYourOrderReady={setIsYourOrderReady}
                  yourOrderReady={yourOrderReady}
                  setYourOrderReady={setYourOrderReady}
                  isCustomer={isCustomer}
                  setIsCustomer={setIsCustomer}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
