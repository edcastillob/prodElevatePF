import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { ProductDetail } from './components/Product/productDetail/productDetail';

function App() {
  return (
    <>
      <div>        
        <h1>Desarrollo prodElevate</h1>        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
