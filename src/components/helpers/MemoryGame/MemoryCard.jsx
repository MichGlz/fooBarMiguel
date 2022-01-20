import React from "react";
import { useState, useEffect } from "react";

export default function MemoryCard(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  function flipCard(e) {
    // setIsFlipped(!isFlipped);
    // console.log(e.target.dataset.name);

    props.setCards(props.card);
  }

  return (
    <div className={props.flipped ? "memory-card flipped" : "memory-card"} onClick={flipCard}>
      <div className="front">
        <img src={props.card.src} alt={props.card.name} />
      </div>

      <div className="back">
        <img src="./assets/logo-02.svg" alt="foobar logo" />
      </div>
    </div>
  );
}
