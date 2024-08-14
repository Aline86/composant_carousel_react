interface CardData {
    color: string,
    cardRef: any,
    transitionFinished: boolean,
    trasnsType: string,
    transX: number,
    width: number, 
    height: number,
    gap: number
} 

function Card({color, cardRef, transitionFinished, trasnsType, transX, width, gap, height
} : CardData) {
    if(transitionFinished){
        return ( <div className="card"  style={{ backgroundColor: `${color}`, width:`${width}px`, height:`${height}px`, marginRight:`${gap}px`, transition: `${trasnsType}`, transform: `translateX(${transX}px)`}} ref={cardRef}></div> )
    }
    else {
        return ( <div className="card" ref={cardRef} style={{backgroundColor: `${color}`, width:`${width}px`, height:`${height}px`, marginRight:`${gap}px`}}></div> )
    }
}

export default Card