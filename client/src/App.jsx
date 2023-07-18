import './App.css'

import { Routes, Route } from 'react-router-dom';
// import { UploadImg } from './components/Product/uploadImg/UploadImg'
// import { Provider } from './components/Product/provider/Provider';
// import { Category } from './components/Product/category/Category';

import { Product } from './components/Product/createProduct/Product';
import { Home } from './components/Home/Home';

// import { Product } from './components/Product/createProduct/Product';



function App() {
  return (
    <>
      <div>

        <h1>Desarrollo prodElevate</h1>
      <Routes>
          
          {/* <Route exact path="/" element={ }/> */}
          <Route exact path="/" element={<Home />}/>
        
      </Routes>


      </div>
     
    </>
  )
}

export default App
