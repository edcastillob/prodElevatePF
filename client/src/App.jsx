import "./App.css";
import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { ProductDetail } from "./components/Product/productDetail/ProductDetail";
import { Landing } from "./components/Landing/Landing";
// import { Category } from "./components/Product/category/Category";
import { Product } from "./components/Product/createProduct/Product";
import { Provider } from "./components/Product/provider/Provider";
import { Role } from "./components/users/role/Role";
import { EditCategory } from "./components/Product//category/EditCategory/EditCategory";
import { CreateUser } from "./components/users/createUser/CreateUser";
import { Configuration } from "./components/Configuration/Configuration";
import { Footer } from "./components/Footer/Footer";
import { Login } from "./components/users/login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Importa 'auth' desde firebase.js
import { auth } from "./components/users/Firebase/firebase.js";
import { handleGoogleSignIn } from "./components/users/Firebase/GoogleLogin"; 
import Cart from "./components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EditProduct } from "./components/Product/editProduct/EditProduct";
import { ShowCategory } from "./components/Product/category/ShowCategory/ShowCategory";
import { ProvidersAll } from "./components/Product/provider/ProvidersAll/ProvidersAll";
import { EditProvider } from "./components/Product/provider/EditProvider/EditProvider";
import { SettingsProduct } from "./components/Product/SettingsProduct/SettingProduct";
// import Chat from './components/Chat/Chat';
import Panel from "./components/Dashboard";

import { UsersAll } from "./components/users/UsersAll/UsersAll";
import { EditUser } from "./components/users/EditUser/EditUser";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLocal, setCurrentUserLocal] = useState(null);

  useEffect(() => {
    setShowNavBar(
      location.pathname !== "/" && location.pathname !== "/dashboard"
    );
  }, [location]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUser(user);
      } else {
        // console.log("Usuario no logueado");
        setCurrentUser(null);
      }
    });
  }, []);

  useEffect(() => {
    // Recupera los datos del usuario almacenados en el LocalStorage al cargar la página
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      // No necesitamos el estado global de Redux, simplemente utilizamos el "user" prop
      setCurrentUserLocal(storedUserData);
    }
  }, []);

  const handleSignIn = async () => {
    try {
      const user = await handleGoogleSignIn();
      setCurrentUser(user);
    } catch (error) {
      navigate("/login");
    }
  };
  return (
    <>
      {showNavBar && (
        <NavBar
          user={currentUser}
          userLocal={currentUserLocal}
          handleSignIn={handleSignIn}
        />
      )}
      {/* {showNavBar && <NavBar user={currentUser} userLocal={currentUserLocal} handleSignIn={handleSignIn} />} */}
      <div>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/producto" element={<Product />} />
          <Route exact path="/producto" element={<SettingsProduct />} />
          {/* <Route exact path="/categoria" element={<Category />} /> */}
          <Route exact path="/categoria" element={<ShowCategory />} />
          <Route exact path="/proveedor" element={<ProvidersAll />} />
          <Route exact path="/proveedoredit/:id" element={<EditProvider />} />
          <Route exact path="/rol" element={<Role />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/usuario" element={<CreateUser />} />
          <Route exact path="/usuario" element={<UsersAll />} />
          <Route path="/productid/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productidedit/:id" element={<EditProduct />} />
          <Route path="/categoryedit/:id" element={<EditCategory />} />
          <Route path="/useredit/:id" element={<EditUser />} />
          {(currentUser || currentUserLocal) && (
            <Route path="/settings" element={<Configuration />} />
          )}
          <Route path="/dashboard" element={<Panel />} />
          {/* <Route path="/chat/" element={<Chat />} /> */}
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
        {showNavBar}
        <Footer />
      </div>
    </>
  );
}

export default App;
