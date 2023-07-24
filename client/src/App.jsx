import './App.css';
import { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { ProductDetail } from './components/Product/productDetail/ProductDetail';
import { Landing } from './components/Landing/Landing';
import { Category } from './components/Product/category/Category';
import { Product } from './components/Product/createProduct/Product';
import { Provider } from './components/Product/provider/Provider';
import { Role } from './components/users/role/Role';
import { CreateUser } from './components/users/createUser/CreateUser';
import {Configuration} from './components/Configuration/Configuration'
import {Footer} from './components/Footer/Footer'
import { Login } from './components/users/login/Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Importa 'auth' desde firebase.js
import { auth } from "./components/users/Firebase/firebase.js";
import { handleGoogleSignIn } from "./components/users/Firebase/GoogleLogin"; // Import your Google sign-in function
import axios from 'axios';

function App() {
  // axios.defaults.baseURL = "http://localhost:3001";
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

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

  // const handleSignIn = async () => {
  //   try {
  //     const user = await handleGoogleSignIn();
  //     console.log(user, ".......");
  //     setCurrentUser(user);
  //   } catch (error) {
  //     // Handle the sign-in error here
  //   }
  // };
  useEffect(() => {
    // Cargar usuario desde sessionStorage si está disponible
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      // Agregar una pequeña espera para asegurarse de que el usuario esté completamente cargado
      setTimeout(() => {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      }, 500);
    }
  }, []);

  const handleSignIn = async () => {
    try {
      const user = await handleGoogleSignIn();
  
      // Almacena el token JWT en el local storage
      localStorage.setItem("jwt", user.token);
  
      setCurrentUser(user.user);
      // Redirige al home después del inicio de sesión exitoso
      navigate("/home");
    } catch (error) {
      // Handle the sign-in error here
      console.log(error);
    }
  };
  

// Agrega el token JWT en los headers de las solicitudes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
          <Route exact path="/login" element={<Login />} />
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
