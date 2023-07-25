import "./App.css";
import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { ProductDetail } from "./components/Product/productDetail/ProductDetail";
import { Landing } from "./components/Landing/Landing";
import { Category } from "./components/Product/category/Category";
import { Product } from "./components/Product/createProduct/Product";
import { Provider } from "./components/Product/provider/Provider";
import { Role } from "./components/users/role/Role";
import { CreateUser } from "./components/users/createUser/CreateUser";
import { Configuration } from "./components/Configuration/Configuration";
import { Footer } from "./components/Footer/Footer";
import { Login } from "./components/users/login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Importa 'auth' desde firebase.js
import { auth } from "./components/users/Firebase/firebase.js";
import { handleGoogleSignIn } from "./components/users/Firebase/GoogleLogin"; // Import your Google sign-in function
import Cart from "./components/Cart/Cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setShowNavBar(location.pathname !== "/");
  }, [location]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Usuario logueado:", user);
        setCurrentUser(user);
      navigate("/home");
      } else {

        console.log("Usuario no logueado");
        setCurrentUser(null);

        // console.log("Usuario no logueado");
        // setCurrentUser(null);
        // navigate("/");

      }
    });
  }, []);

  const handleSignIn = async () => {
    try {



      const user = await handleGoogleSignIn();      
      setCurrentUser(user);
      navigate("/home");
    } catch (error) {
      navigate("/login");   }


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
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/usuario" element={<CreateUser />} />
          {/* <Route exact path="/" element={<Provider />} /> */}
          <Route exact path="/home" element={<Home />} />
          <Route path="/productid/:id" element={<ProductDetail />} />
          <Route path="/productidedit/:id" element={<EditProduct />} />

          <Route path="/cart" element={<Cart />} />
          {currentUser && (
            <Route path="/settings" element={<Configuration />} />
            )}       
        
        </Routes>
        <ToastContainer 
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={false}
        theme="dark"
        />
        <Footer />
      </div>
    </>
  );
}

export default App;

