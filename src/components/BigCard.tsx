import { useSwipeable } from "react-swipeable";

interface CardData {
  color: string;

  width: number;
  updateCard: any;
  index: number;
  moveLeft: any;
  moveRight: any;
}

function BigCard({
  color,
  width,
  updateCard,
  index,
  moveLeft,
  moveRight,
}: CardData) {
  const result = window.matchMedia("(max-width: 700px)");
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => moveLeft(),
    onSwipedRight: () => moveRight(),
  });
  return (
    <div
      {...swipeHandlers}
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
