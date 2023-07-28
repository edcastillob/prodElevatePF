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
import { handleGoogleSignIn } from "./components/users/Firebase/GoogleLogin"; // Import your Google sign-in function
import Cart from "./components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EditProduct } from "./components/Product/editProduct/EditProduct";
import { ShowCategory } from "./components/Product/category/ShowCategory/ShowCategory";
import { ProvidersAll } from "./components/Product/provider/ProvidersAll/ProvidersAll";
import { EditProvider } from "./components/Product/provider/EditProvider/EditProvider";
import { SettingsProduct } from "./components/Product/SettingsProduct/SettingProduct";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLocal, setCurrentUserLocal] = useState(null);

  useEffect(() => {
    setShowNavBar(location.pathname !== "/");
  }, [location]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log("Yonatan id user: ", user);
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
          {/* showcategory muestra todas las categorias es la vista al acceder a category desde admin */}
          {/* ProviderAll muestra todas las providers es la vista al acceder a providers desde admin */}
          {/* SettingsProduct muestra todas las products es la vista al acceder a Product desde admin */}
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          {/* <Route exact path="/producto" element={<Product />} /> */}
          <Route exact path="/producto" element={<SettingsProduct />} />
          {/* <Route exact path="/categoria" element={<Category />} /> */}
          <Route exact path="/categoria" element={<ShowCategory />} />
          <Route exact path="/proveedor" element={<ProvidersAll />} />
          <Route exact path="/proveedoredit/:id" element={<EditProvider />} />
          <Route exact path="/rol" element={<Role />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/usuario" element={<CreateUser />} />
          <Route path="/productid/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productidedit/:id" element={<EditProduct />} />
          <Route path="/categoryedit/:id" element={<EditCategory />} />
          {(currentUser || currentUserLocal) && (
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
