import Carousel from "./components/Carousel"

function App() {
  return (
    // Possibilité de moduler la taille en pixel et l'espacemement directement à cet emplacement
    <Carousel 
      height={300} 
      width={200} 
      gap={30} 
      cardNumber={15}
    />
  )
}

export default App
