import './App.css';
import { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { ProductDetail } from './components/Product/productDetail/ProductDetail';
import { Landing } from './components/Landing/Landing';
import { Category } from './components/Product/category/Category';
import { Product } from './components/Product/createProduct/Product';
import { Provider } from './components/Product/provider/Provider';
import { Role } from './components/users/role/Role';
import { CreateUser } from './components/users/createUser/CreateUser';
import { Login } from './components/users/login/Login';
import {Cart} from './components/Cart/Cart';

function App() {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    setShowNavBar(location.pathname !== "/");
  }, [location]);

  return (
    <>
      {showNavBar && <NavBar />}
      <div>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/categoria" element={<Category />} />
          <Route exact path="/producto" element={<Product />} />
          <Route exact path="/proveedor" element={<Provider />} />
          <Route exact path="/rol" element={<Role />} />
          <Route exact path="/usuario" element={<CreateUser />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/cart" element={<Cart/>} />
          {/* <Route exact path="/" element={<Provider />} /> */}
          <Route exact path="/home" element={<Home />} />
          <Route path="/productid/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;