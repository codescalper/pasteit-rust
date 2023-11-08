import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PasteArea from './components/Form/Snippet'
import Success from './components/Form/Success' 

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PasteArea />} />
          <Route path="/snippet/:token" element={<Success />} />
        </Routes>
       
      </BrowserRouter>
    </>
  )
}

export default App;
