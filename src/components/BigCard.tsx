import { useSwipeable } from "react-swipeable";

interface CardData {
  color: string;
  height: number;
  width: number;
  updateCard: any;
  index: number;
  moveLeft: any;
  moveRight: any;
}

function BigCard({
  color,
  width,
  height,
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
        width: `${!result.matches ? `${width * 3}px` : `${width}px`}`,
        transition: "background-color ease-in-out 0.5s",
        height: `${!result.matches ? `${height}px` : `${height}px`}`,
        margin: `0 auto`,
      }}
    ></div>
  );
}

export default BigCard;
