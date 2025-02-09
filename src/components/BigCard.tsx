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

function BigCard({
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

  return (
    <div
      onClick={updateCard}
      className="card-app-big"
      ref={cardRef}
      data-value={index}
      style={{
        backgroundColor: `${color}`,
        width: `${!result.matches ? `${width * 3}px` : `calc(100vw - 40px)`}`,
        transition: "background-color ease-in-out 0.5s",
        margin: `0 auto`,
      }}
    ></div>
  );
}

export default BigCard;
