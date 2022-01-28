import "./MemoryGame.scss";
import React from "react";
import { useState, useEffect } from "react";
import MemoryCard from "./MemoryCard";

export default function MemoryGame(props) {
  const [allCards, setAllCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [gameDisabled, setGameDisabled] = useState(false);
  const [noMatchs, setNoMatchs] = useState(0);

  // console.log(firstCard);

  function setCards(card) {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setGameDisabled(true);
      if (firstCard.name === secondCard.name) {
        setAllCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.name === firstCard.name) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        setNoMatchs(noMatchs + 1);
        resetCards();
      } else {
        setTimeout(() => {
          resetCards();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  function resetCards() {
    setFirstCard(null);
    setSecondCard(null);
    setGameDisabled(false);
  }

  function prepareCards() {
    const dataCards = [...props.products, ...props.products];
    console.log(dataCards);
    const randomizeCards = dataCards.map((beer) => ({ name: beer.name, src: "./assets/" + beer.label, match: false })).sort(() => Math.random() - 0.5);
    setAllCards(randomizeCards);
  }

  useEffect(() => {
    prepareCards();
  }, []);

  useEffect(() => {
    const gameBoard = document.querySelector(".game");
    gameBoard.style.pointerEvents = gameDisabled ? "none" : "all";
  }, [gameDisabled]);

  useEffect(() => {
    console.log(noMatchs);
    noMatchs > 9 &&
      setTimeout(() => {
        prepareCards();
        setNoMatchs(0);
      }, 4000);
  }, [noMatchs]);

  const displayCards = allCards.map((beer, i) => <MemoryCard key={"card0" + i} card={beer} setCards={setCards} flipped={beer === firstCard || beer === secondCard || beer.match} />);
  return <section className="game">{displayCards}</section>;
}
