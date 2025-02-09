interface CardData {
  color: string;

  width: number;
  updateCard: any;
  index: number;
}

function BigCard({ color, width, updateCard, index }: CardData) {
  const result = window.matchMedia("(max-width: 700px)");

  return (
    <div
      onClick={updateCard}
      className="card-app-big"
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
