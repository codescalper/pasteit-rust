import Header from './components/Header'
import Hero from './components/Hero'
import Steps from './components/Steps'

function App() {


  return (
    <>
      <Header />      
      <Hero />  
      <div className="container mx-auto px-4 lg:w-2/4 my-24">
      <Steps />
      </div>
    </>
  )
}

export default App
