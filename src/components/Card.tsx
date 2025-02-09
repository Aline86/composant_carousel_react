interface CardData {
  color: string;
  cardRef: any;
  transitionFinished: boolean;
  trasnsType: string;
  transX: number;
  width: number;
  height: number;
  gap: number;
  updateCard: any;
  index: number;
}

function Card({
  color,
  cardRef,
  transitionFinished,
  trasnsType,
  transX,
  width,
  gap,
  height,
  updateCard,
  index,
}: CardData) {
  const result = window.matchMedia("(max-width: 700px)");
  if (transitionFinished) {
    return (
      <div
        className="card-app"
        style={{
          backgroundColor: `${color}`,
          width: `${!result.matches ? `${width}px` : `calc(100vw - 40px)`}`,
          height: `${height}px`,
          marginRight: `${!result.matches ? gap : 10}px`,
          transition: `${trasnsType}`,
          marginLeft: `${result.matches ? gap * 0.5 : 0}px`,
          transform: `translateX(${transX}px)`,
        }}
        ref={cardRef}
      ></div>
    );
  } else {
    return (
      <div
        onClick={updateCard}
        className="card-app"
        ref={cardRef}
        data-value={index}
        style={{
          backgroundColor: `${color}`,
          width: `${!result.matches ? `${width}px` : `calc(100vw - 40px)`}`,
          height: `${height}px`,
          marginRight: `${!result.matches ? gap : 10}px`,
          marginLeft: `${result.matches ? gap * 0.5 : 0}px`,
        }}
      ></div>
    );
  }
}

export default Card;
