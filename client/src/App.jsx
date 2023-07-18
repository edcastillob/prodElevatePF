import './App.css'
<<<<<<< Updated upstream
=======
import { Routes, Route } from 'react-router-dom';
// import { UploadImg } from './components/Product/uploadImg/UploadImg'
// import { Provider } from './components/Product/provider/Provider';
// import { Category } from './components/Product/category/Category';
import { Product } from './components/Product/createProduct/Product';
import { Home } from './components/Home/Home';
>>>>>>> Stashed changes

function App() {
  return (
    <>
      <div>
<<<<<<< Updated upstream
        <h1>Desarrollo prodElevate</h1>
=======
        <Product />
      <Routes>
          
          {/* <Route exact path="/" element={ }/> */}
          <Route exact path="/" element={<Home />}/>
        
      </Routes>

>>>>>>> Stashed changes
      </div>
     
    </>
  )
}

export default App
