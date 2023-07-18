import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Cart } from './components/Cart/Cart'
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { ProductDetail } from './components/Product/productDetail/productDetail';


function App() {
  return (
    <>
      <NavBar/>        
      <div>         
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
        </Routes>
        <Cart/> 
      </div>
    </>
  );
}

export default App;
