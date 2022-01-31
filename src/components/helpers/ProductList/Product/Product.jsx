import "./Product.scss";
import { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import useSound from "use-sound";
import sound from "../../sounds/coin_effect.mp3";
import sound2 from "../../sounds/add.mp3";

export default function Product(props) {
  const [flipped, setFlipped] = useState(false);
  const [amount, setAmount] = useState(0);
  const [adding, setAdding] = useState(false);
  const [playCoin] = useSound(sound, { interrupt: true, volume: 0.1 });
  const [playAdd] = useSound(sound2, { interrupt: true, volume: 0.1 });

  useEffect(() => {
    const fedbackBeer = document.querySelector(`.${props.id}`);
    if (adding) {
      fedbackBeer.classList.add("show");
      fedbackBeer.addEventListener("animationend", function unshow() {
        setAmount(0);
        setAdding(false);
        fedbackBeer.classList.remove("show");

        fedbackBeer.removeEventListener("animationend", unshow);
      });
    }
  }, [adding]);

  function increaseAmount() {
    // console.log(props.id);
    setAmount((prevAmount) => prevAmount + 1);
  }

  function decreaseAmount() {
    // console.log(props.id);

    setAmount((prevAmount) => {
      if (prevAmount > 0) {
        return prevAmount - 1;
      }
      return 0;
    });
  }

  function handleClick() {
    setFlipped((flipped) => !flipped);
  }

  function add() {
    props.addToBasket({
      amount: amount,
      price: function () {
        return props.price() * this.amount * (props.isHappyHour ? 0.5 : 1);
      },
      name: props.name,
    });
  }

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
      <article className="Product">
        <button className="moreInfo" onClick={handleClick}>
          Info
        </button>

        <div className="mainInfo">
          <img src={"./assets/" + props.label} alt="" />
          <div className="text">
            <p>
              {props.category} | {props.alc}%
            </p>
            <h3>{props.name}</h3>
            <div className="money">
              <img src={props.isHappyHour ? "/assets/star.svg" : "/assets/coin.svg"} alt={props.isHappyHour ? "star from a video game" : "coin from a video game"} className={props.isHappyHour ? "blink" : null} />
              <p className="price">{props.price() * (props.isHappyHour ? 0.5 : 1)}kr</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <div className="amountWrapper">
            <button onClick={decreaseAmount}>-</button>
            <p className="amount">{amount}</p>
            <button onClick={increaseAmount} onMouseDown={() => playCoin()}>
              +
            </button>
          </div>
          <div className="button-add-wrapper">
            <button
              className="buttonAdd"
              onClick={() => {
                add();
                playAdd();
                setAdding(true);
              }}
              style={amount < 1 ? { backgroundColor: "grey", pointerEvents: "none" } : { backgroundColor: "blue", pointerEvents: "all" }}
            >
              Add
            </button>
            <div className={"feedback-beer " + props.id}>
              <p>{amount}</p>
            </div>
          </div>
        </div>
      </article>
      <div className="ProductReverse">
        <button className="reverseCard" onClick={handleClick}>
          X
        </button>
        <p>
          <strong>Aroma: </strong>
          {props.description.aroma}
        </p>
        <p>
          <strong>Flavor: </strong>
          {props.description.flavor}
        </p>
      </div>
    </ReactCardFlip>
  );
}
