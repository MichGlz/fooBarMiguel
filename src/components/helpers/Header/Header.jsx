import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import "./Header.scss";
export default function Header(props) {
  const [windowDimension, setWindowDimension] = useState(null);

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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

  const isMobile = windowDimension <= 640;

  return (
    <header className={props.isCustomer ? "mobileHeader" : "null"}>
      <div className="logo">
        <a href="/">
          <img src={props.isCustomer && isMobile ? "/assets/logo-02-black.svg" : "/assets/logo-02.svg"} alt="logo foobar" />
        </a>
      </div>
      <Nav isMobile={isMobile} cart={props.cart} changeCartState={props.changeCartState} isCustomer={props.isCustomer} click={click} handleClick={handleClick} closeMobileMenu={closeMobileMenu} />
    </header>
  );
}
