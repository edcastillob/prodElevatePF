import './App.css';
import { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { ProductDetail } from './components/Product/productDetail/productDetail';
import { Landing } from './components/Landing/Landing';

function App() {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {    
    setShowNavBar(location.pathname !== '/');
  }, [location]);

  return (
    <>
      {showNavBar && <NavBar />}
      <div>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
