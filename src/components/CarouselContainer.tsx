import { useEffect, useState } from "react";
import Card from "./Card";
import BigCard from "./BigCard";

interface CarouselData {
  colors: string[];
  transitionFinished: boolean;
  cardWidth: number;
  updateCardRef: any;
  updateColors: any;
  cardRef: any;
  updateTransitionState: any;
  width: number;
  height: number;
  gap: number;

  setIsClic: any;
  setCardValue: any;
  updateCardEnd: any;
  clic: boolean;
  cardValue: number;
}

function CarouselContainer({
  colors,
  transitionFinished,
  cardWidth,
  updateCardRef,
  cardRef,
  updateTransitionState,
  updateColors,
  width,
  gap,
  height,

  setIsClic,
  setCardValue,
  updateCardEnd,
  clic,
  cardValue,
}: CarouselData) {
  const [trigger, setTrigger] = useState(0);
  const [move, setMove] = useState(0);
  const [isLeft, setIsLeft] = useState(true);

  const [card, setCard] = useState(colors[2]);

  const result = window.matchMedia("(max-width: 700px)");

  function updateCard(e: any) {
    setCard(colors[e.target.getAttribute("data-value")]);
    if (e.target.getAttribute("data-value") > 1) {
      setCardValue(e.target.getAttribute("data-value") - 2);
      setIsClic(true);
      const trans = Number(e.target.getAttribute("data-value")) - 1;
      setMove(-((cardWidth + gap * 0.3) * trans));
      setIsLeft(true);
      setTrigger(trigger + 1);

      updateTransitionState(true);
    }

    //
  }

  function updateTransitionLeft() {
    const popItem = colors.pop();
    if (popItem !== undefined) {
      colors.unshift(popItem);

      updateColors(colors);
      updateTransitionState(true);
    }
  }

  function updateTransitionRight() {
    const shiftItem = colors.shift();
    if (shiftItem !== undefined) {
      colors.push(shiftItem);
      updateColors(colors);

      updateTransitionState(true);
    }
  }

  function moveLeft() {
    setMove(-cardWidth - gap / 2);
    setIsLeft(true);
    setTrigger(trigger + 1);
    updateTransitionState(true);
    setCard(colors[2]);
  }

  function moveRight() {
    setMove(cardWidth + gap / 2);
    setIsLeft(false);
    setTrigger(trigger + 1);
    updateTransitionState(true);
    setCard(colors[0]);
  }

  useEffect(() => {
    updateCardRef();
  }, []);

  useEffect(() => {
    if (!isLeft) {
      updateTransitionLeft();
    } else {
      updateTransitionRight();
    }
  }, [trigger]);

  return (
    <div>
      <div className="center">
        <BigCard
          key={-1}
          index={1}
          color={card}
          width={width}
          updateCard={updateCard}
          moveLeft={moveLeft}
          moveRight={moveRight}
          height={height}
        />
      </div>

      <div
        className="body"
        onTransitionEnd={() => {
          clic && cardValue > 0 && updateCardEnd();
          updateTransitionState(false);
        }}
      >
        {transitionFinished ? (
          <button
            className="left"
            style={{
              marginRight: `${!result.matches ? gap * 0.5 : 0}px`,
              pointerEvents: "none",
              color: "lightgray",
            }}
          >
            <span>&#x27E8;</span>
          </button>
        ) : (
          <button
            className="left"
            onClick={() => moveRight()}
            style={{
              marginRight: `${!result.matches ? gap * 0.5 : 0}px`,
            }}
          >
            <span>&#x27E8;</span>
          </button>
        )}
        <div
          className="container_class"
          style={{
            minWidth: `${cardWidth + gap} px`,
            margin: `${gap}px auto`,
            height: `${!result.matches ? height + 2 : height * 0.3 + 3}px`,
            width: `${result.matches ? "80vw" : "90vw"}`,
          }}
        >
          <div
            className="card-container"
            style={{
              minWidth: `${cardWidth + gap / 2}px`,
              transform: `translateX(${-cardWidth - gap / 2}px)`,
            }}
          >
            <div className="cards">
              {colors.map((value, index) => {
                return (
                  <Card
                    key={index}
                    index={index}
                    color={value}
                    cardRef={cardRef}
                    transitionFinished={transitionFinished}
                    trasnsType={"transform 0.4s ease-in"}
                    transX={move}
                    width={width}
                    gap={gap}
                    height={height}
                    updateCard={updateCard}
                  />
                );
              })}
              {
                <Card
                  key={-1}
                  index={1}
                  color={colors[0]}
                  cardRef={cardRef}
                  transitionFinished={transitionFinished}
                  trasnsType={"transform 0.4s ease-in"}
                  transX={move}
                  width={width}
                  gap={gap}
                  height={height}
                  updateCard={updateCard}
                />
              }
            </div>
          </div>
        </div>
        {transitionFinished ? (
          <button
            className="right"
            style={{
              marginLeft: `${!result.matches ? gap : 0}px`,
              pointerEvents: "none",
              color: "lightgray",
            }}
          >
            <span>&#x27E9;</span>
          </button>
        ) : (
          <button
            className="right"
            onClick={() => moveLeft()}
            style={{
              marginLeft: `${!result.matches ? gap : 0}px`,
            }}
          >
            <span>&#x27E9;</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default CarouselContainer;
