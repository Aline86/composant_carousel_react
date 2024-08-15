import { useEffect, useState, useRef } from 'react'
import '../assets/styles/global.css'
import CarouselContainer from "./CarouselContainer"

interface CustomCarouselInfo {
  width: number, 
  height: number,
  cardNumber: number,
  gap: number,
  
} 
function Carousel({width, height, gap, cardNumber}: CustomCarouselInfo) {
  const [colors, setColors] = useState<string[]>([]);
  const [transitionFinished, setTransitionFinished] = useState(false);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>();
  const hexCharacters :any[] =[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"] ;
  
  function generateColor() {
    let arrayColors = [];
    for (let index = 0; index < cardNumber; index++) {
      arrayColors.push(generateJustOneColor());
    }
    setColors(arrayColors);
  }

  function getCharacter(index: any) {
    return hexCharacters[index]
  }
  
  function generateJustOneColor(){
      
    let hexColorRep = "#"
    for (let index = 0; index < 6; index++) {
        const randomPosition = Math.floor ( Math.random() * hexCharacters.length ) 
        hexColorRep += getCharacter( randomPosition )
    }

    return hexColorRep
  }
  function updateCardRef() {
    const cardWidth: number|undefined = cardRef.current?.clientWidth
    if(cardWidth !== undefined) {
      setCardWidth(cardWidth + 15)
    }
  }
 
  function updateTransitionState(state: boolean) {
    setTransitionFinished(state);
  }

  function updateColors(state: boolean) {
    setTransitionFinished(state);
  }

  useEffect(() => {
    generateColor();
  }, []);
  
  return (
    <div className="body-container" >
        {colors.length === cardNumber && 
          <CarouselContainer 
            width={width} 
            height={height} 
            gap={gap}
            updateColors={updateColors} 
            colors={colors} 
            transitionFinished={transitionFinished} 
            updateTransitionState={updateTransitionState} 
            cardWidth={cardWidth} 
            updateCardRef={updateCardRef} 
            cardRef={cardRef} 
            cardNumber={cardNumber}
          />
        }       
    </div>
    
  )
}

export default Carousel
