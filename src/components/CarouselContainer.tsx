import { useEffect, useState } from "react";
import Card from "./Card";
import BigCard from "./BigCard";
import fleche from "./img/fleche.png";

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
  trigger: number;
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

  clic,
  cardValue,
}: CarouselData) {
  const [move, setMove] = useState(0);
  const [isLeft, setIsLeft] = useState(true);

  const [card, setCard] = useState(colors[2]);

  const result = window.matchMedia("(max-width: 700px)");

  function updateCard(e: any) {
    const value = Number(e.currentTarget.getAttribute("data-value"));
    if (isNaN(value) || value <= 1) return;

    const trans = value - 1;

    setCard(colors[value]);
    setIsClic(true);
    setIsLeft(true);
    setCardValue(trans);

    setMove(-(cardWidth + gap) * trans);

    updateTransitionState(true);
  }

  function moveLeft() {
    setMove(-cardWidth - gap / 2);
    setIsLeft(true);
    setIsClic(false);
    updateTransitionState(true);
    setCard(colors[2]);
  }

  function moveRight() {
    setMove(cardWidth + gap / 2);
    setIsLeft(false);
    setIsClic(false);
    updateTransitionState(true);
    setCard(colors[0]);
  }

  useEffect(() => {
    updateCardRef();
  }, []);

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
          if (clic) {
            let newColors = [...colors];

            for (let i = 0; i < cardValue; i++) {
              const shiftItem = newColors.shift();
              if (shiftItem !== undefined) {
                newColors.push(shiftItem);
              }
            }

            updateColors(newColors);
            setIsClic(false);
          } else {
            if (isLeft) {
              const shiftItem = colors[0];
              updateColors([...colors.slice(1), shiftItem]);
            } else {
              const last = colors[colors.length - 1];
              updateColors([last, ...colors.slice(0, -1)]);
            }
          }

          setMove(0);
          updateTransitionState(false);
        }}
      >
        {transitionFinished ? (
          <span
            className="left"
            style={{
              marginRight: `${!result.matches ? gap * 0.5 : 0}px`,
              pointerEvents: "none",
              color: "lightgray",
            }}
          >
            <img src={fleche} alt="flèche de doite" />
          </span>
        ) : (
          <span
            className="left"
            onClick={() => moveRight()}
            style={{
              marginRight: `${!result.matches ? gap * 0.5 : 0}px`,
            }}
          >
            <img src={fleche} alt="flèche de doite" />
          </span>
        )}
        <div
          className="container_class"
          style={{
            minWidth: `${cardWidth + gap} px`,
            margin: `${gap}px auto`,
            height: `${!result.matches ? height + 2 : height * 0.3 + 3}px`,
            width: `${result.matches ? "95vw" : "90vw"}`,
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
          <span
            className="right"
            style={{
              marginLeft: `${!result.matches ? gap : gap * 0.5}px`,
              pointerEvents: "none",
              color: "lightgray",
            }}
          >
            <img src={fleche} alt="flèche de gauche" />
          </span>
        ) : (
          <span
            className="right"
            onClick={() => moveLeft()}
            style={{
              marginLeft: `${!result.matches ? gap : gap * 0.5}px`,
            }}
          >
            <img src={fleche} alt="flèche de gauche" />
          </span>
        )}
      </div>
    </div>
  );
}

export default CarouselContainer;
