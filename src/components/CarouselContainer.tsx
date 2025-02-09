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
  cardNumber: number;
  setColors: any;
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
  cardNumber,
  setColors,
}: CarouselData) {
  const [trigger, setTrigger] = useState(0);
  const [move, setMove] = useState(0);
  const [isLeft, setIsLeft] = useState(true);
  const [card, setCard] = useState(colors[2]);
  const result = window.matchMedia("(max-width: 700px)");

  function updateCard(e: any) {
    setCard(colors[e.target.getAttribute("data-value")]);
    const trans =
      Number(colors.length) - 1 - Number(e.target.getAttribute("data-value"));
    let col_int = colors.splice(0, e.target.getAttribute("data-value") - 1);

    setMove(-cardWidth * trans - (gap / 2) * trans);
    setColors(colors.concat(col_int));
    setIsLeft(true);

    updateTransitionLeft();
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
  useEffect(() => {}, [card]);
  useEffect(() => {
    updateCardRef();
  }, []);

  useEffect(() => {}, [card]);
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
        />
      </div>

      <div
        className="body"
        onTransitionEnd={() => updateTransitionState(false)}
      >
        {transitionFinished ? (
          <button
            className="left"
            style={{
              marginRight: `${!result.matches ? gap : 0}px`,
              pointerEvents: "none",
              color: "lightgray",
            }}
          >
            &#x27E8;
          </button>
        ) : (
          <button
            className="left"
            onClick={() => moveRight()}
            style={{ marginRight: `${gap}px` }}
          >
            <span>&#x27E8;</span>
          </button>
        )}
        <div
          className="container_class"
          style={{
            minWidth: `${cardWidth + gap} px`,
            margin: `${gap}px auto`,
            height: `${height + 2}px`,
            width: `${width * cardNumber}px`,
            maxWidth: "100%",
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
                    trasnsType={"transform 0.3s ease-in"}
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
                  trasnsType={"transform 0.3s ease-in"}
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
            &#x27E9;
          </button>
        ) : (
          <button
            className="right"
            onClick={() => moveLeft()}
            style={{ marginLeft: `${gap}px` }}
          >
            <span>&#x27E9;</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default CarouselContainer;
