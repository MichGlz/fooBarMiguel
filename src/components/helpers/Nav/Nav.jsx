import { NavLink } from "react-router-dom";
export default function Nav(props) {
  return (
    <nav className="navigation">
      <ul className={props.click ? "nav-options active" : "nav-options"}>
        <li className="option" onClick={props.closeMobileMenu}>
          <NavLink to="/">{props.isCustomer ? "Exit" : "Home"}</NavLink>
        </li>

        {!props.isCustomer && (
          <li className="option" onClick={props.closeMobileMenu}>
            <NavLink to="/Manager">Manager</NavLink>
          </li>
        )}

        {!props.isCustomer && !props.isMobile && (
          <li className="option" onClick={props.closeMobileMenu}>
            <NavLink to="/Bartender">Bartenders</NavLink>
          </li>
        )}

        <li
          className="option"
          onClick={() => {
            props.closeMobileMenu();
            props.changeCartState(true);
            props.setAccess(false);
          }}
        >
          <NavLink to="/Dashboard">{!props.isCustomer ? "Customers" : "Dashboard"}</NavLink>
        </li>

        {props.isCustomer && (
          <li className="option" onClick={props.closeMobileMenu}>
            <NavLink
              to="/Menu"
              onClick={() => {
                props.changeCartState(!props.cart);
              }}
            >
              {props.isMobile ? (!props.cart ? "Cart" : "Menu") : "Menu"}
            </NavLink>
          </li>
        )}
      </ul>
      <div className="mobile-menu" onClick={props.handleClick}>
        <button className="btn-burger">{props.click ? "X" : "☰"}</button>
      </div>
    </nav>
  );
}
