import "./MemoryGame.scss";
import React from "react";
import { useState, useEffect } from "react";
import MemoryCard from "./MemoryCard";
import ModalPlayAgain from "./ModalPlayAgain";
import useSound from "use-sound";
import sound from "../sounds/add.mp3";

export default function MemoryGame(props) {
  const [allCards, setAllCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [gameDisabled, setGameDisabled] = useState(false);
  const [noMatchs, setNoMatchs] = useState(0);
  const [isGameFinish, setIsGameFinish] = useState(false);

  // console.log(firstCard);

  const [play] = useSound(sound, { interrupt: true });
  useEffect(() => {
    play();
  }, [isGameFinish]);

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

  function gameFinished() {
    setTimeout(() => {
      prepareCards();
      setNoMatchs(0);
      setIsGameFinish(true);
    }, 1200);
  }

  useEffect(() => {
    console.log(noMatchs);
    noMatchs > 9 && gameFinished();
  }, [noMatchs]);

  const displayCards = allCards.map((beer, i) => <MemoryCard key={"card0" + i} card={beer} setCards={setCards} flipped={beer === firstCard || beer === secondCard || beer.match} />);
  return (
    <>
      {isGameFinish && <ModalPlayAgain setIsGameFinish={setIsGameFinish} />}
      <section className="game">{displayCards}</section>
    </>
  );
}
