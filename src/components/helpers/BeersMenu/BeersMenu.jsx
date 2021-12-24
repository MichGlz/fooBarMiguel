import BeerProduct from "./BeerProduct";
import "./BeersMenu.scss";

export default function BeersMenu(props) {
  const products = [...props.products].filter((beer) => beer.onTap);
  const displayList = products.map((beer) => <BeerProduct key={beer.id} {...beer} isHappyHour={props.isHappyHour} />);
  return (
    <section className="BeersMenu">
      <h2>Our Selection</h2>
      <ul className="beers-list">{displayList}</ul>
    </section>
  );
}
