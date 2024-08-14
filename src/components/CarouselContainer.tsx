import { useEffect, useState } from 'react'
import '../global.css'
import Card from "./Card"

interface CarouselData {
  colors: string[],
  transitionFinished: boolean,
  cardWidth: number,
  updateCardRef: any,
  updateColors: any,
  cardRef: any,
  updateTransitionState: any,
  width: number, 
  height:number,
  gap: number,
  cardNumber: number
} 

function CarouselContainer({colors,  transitionFinished, cardWidth, updateCardRef, cardRef, updateTransitionState, updateColors, width, gap, height, cardNumber} : CarouselData) {
  const [trigger, setTrigger] = useState(0);
  const [move, setMove] = useState(0);
  const [isLeft, setIsLeft] = useState(true);

  function updateTransitionLeft() {
    const popItem = colors.shift();
    if(popItem !== undefined) {
      colors.push(popItem)
      updateColors(colors);
      updateTransitionState(true);
    }   
  }

  function updateTransitionRight() {
    const popItem = colors.pop();
    if(popItem !== undefined) {
      colors.unshift(popItem)
      updateColors(colors);
      updateTransitionState(true);
    }
  }
 
  function moveLeft() {
    setMove(-cardWidth - gap + 15);
    setIsLeft(true)
    setTrigger(trigger + 1);
    updateTransitionState(true)
  }

  function moveRight() {
    setMove(cardWidth + gap - 15);
    setIsLeft(false)
    setTrigger(trigger + 1);
    updateTransitionState(true)
  }

  useEffect(() => {
    updateCardRef()
  }, []);

  useEffect(() => {
    if(isLeft) {
      updateTransitionLeft()
    }
    else
    {
      updateTransitionRight()
    }
  }, [trigger]);

  return (
    <div className="body" onTransitionEnd={() => updateTransitionState(false)} style={{maxWidth: `100%`, width:`${cardNumber * width }px`}} >
      {transitionFinished ? (<button className="left" onClick={() => moveLeft()} style={{marginRight: `${gap}px`, pointerEvents: 'none', color: 'lightgray'}}  >&#x27E8;</button>) : (<button className="left" onClick={() => moveLeft()} style={{marginRight: `${gap}px`}}  >&#x27E8;</button>) }
      <div className="container" style={{margin: `${gap}px auto`, height: `${height + 2}px`, width: `${width * (cardNumber)}px`}} >
          <div className="card-container" style={{transform: `translateX(-${(cardWidth + gap * 0.5 )}px)`}}>
            <div className="cards">
              {
                colors.map((value, index) => {
                  return (
                    <Card key={index} color={value} cardRef={cardRef} transitionFinished={transitionFinished} trasnsType={"transform 0.3s ease-in"} transX={move} width={width} gap={gap} height={height} />
                  )
                })
              }
            </div>
          </div>
      </div>
          {transitionFinished ? (<button className="right" onClick={() => moveRight()} style={{marginLeft: `${gap}px`, pointerEvents: 'none', color: 'lightgray'}}  >&#x27E9;</button>) : (<button className="right" onClick={() => moveRight()} style={{marginLeft: `${gap}px`}}  >&#x27E9;</button>) }   
    </div>
    
  )
}

export default CarouselContainer
