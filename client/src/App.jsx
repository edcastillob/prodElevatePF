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
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Importa 'auth' desde firebase.js
import { auth } from "./components/users/Firebase/firebase.js";
import { handleGoogleSignIn } from "./components/users/Firebase/GoogleLogin"; // Import your Google sign-in function

function App() {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setShowNavBar(location.pathname !== "/");
  }, [location]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log("Usuario logueado:", user);
        // Puedes realizar cualquier otra acción necesaria
        setCurrentUser(user);
      } else {
        // User is signed out
        console.log("Usuario no logueado");
        setCurrentUser(null);
      }
    });
  }, []);

  const handleSignIn = async () => {
    try {
      const user = await handleGoogleSignIn();
      console.log(user, ".......");
      setCurrentUser(user);
    } catch (error) {
      // Handle the sign-in error here
    }
  };
  return (
    <>
      {showNavBar && <NavBar user={currentUser} handleSignIn={handleSignIn} />}
      <div>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/categoria" element={<Category />} />
          <Route exact path="/producto" element={<Product />} />
          <Route exact path="/proveedor" element={<Provider />} />
          <Route exact path="/rol" element={<Role />} />
          <Route exact path="/usuario" element={<CreateUser />} />
          {/* <Route exact path="/" element={<Provider />} /> */}
          <Route exact path="/home" element={<Home />} />
          <Route path="/productid/:id" element={<ProductDetail />} />
          <Route path="/settings" element={<Configuration />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
