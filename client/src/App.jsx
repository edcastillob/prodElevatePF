import "./App.css";
import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { ProductDetail } from "./components/Product/productDetail/ProductDetail";
import { Landing } from "./components/Landing/Landing";
//import { Category } from "./components/Product/category/Category";
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
import Favorites from "./components/Favorites/Favorites";
import { ShowCategory } from "./components/Product/category/ShowCategory/ShowCategory";
import { ProvidersAll } from "./components/Product/provider/ProvidersAll/ProvidersAll";
import { EditProvider } from "./components/Product/provider/EditProvider/EditProvider";
import { SettingsProduct } from "./components/Product/SettingsProduct/SettingProduct";
// import Chat from './components/Chat/Chat';
import Panel from "./components/Dashboard";
import { UsersAll } from "./components/users/UsersAll/UsersAll";
import { EditUser } from "./components/users/EditUser/EditUser";
import { AboutUs } from "./components/AboutUs/AboutUs";
import { PrivacyPolicy } from "./components/PrivacyPolicy/PrivacyPolicy";
import { TermsConditions } from "./components/TermsConditions/TermsConditions";
import { ContactUs } from "./components/ContactUs.jsx/ContactUs";
import ThankYouPage from "./components/ThankYouPage/ThankYouPage";
import { useDispatch, useSelector } from "react-redux";
import { checkEmailAndRegister, getUserSystemLog, getUsers } from "./redux/actions/actions";
import { ChangePassword } from "./components/users/changePassword/ChangePassword";

// LANGUAGE SETTINGS
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
  },
});



function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavBar, setShowNavBar] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLocal, setCurrentUserLocal] = useState(null);
  // LANGUAGE STATE & HANDLE
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en" 
  );

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem("selectedLanguage", language); 
  };



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
        // console.log(user)
        setCurrentUser(user);
        dispatch(checkEmailAndRegister(user))
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
  // console.log('currentUserLocal_: ', currentUserLocal.email)
  
  
  useEffect(() => {
    if(currentUserLocal){
      dispatch(getUserSystemLog(currentUserLocal.email))
    }

    }, []);
  const userActive = useSelector((state) => state.userLog);
  
  console.log('userActive: ', userActive)
  console.log('rol de user: ', userActive.roleId)

  return (
    <>
    <I18nextProvider i18n={i18next}>
      {showNavBar && (
        <NavBar
          user={currentUser}
          userLocal={currentUserLocal}
          handleSignIn={handleSignIn}
          currentLanguage={currentLanguage} 
          handleLanguageChange={handleLanguageChange}
        />
      )}
      {/* {showNavBar && <NavBar user={currentUser} userLocal={currentUserLocal} handleSignIn={handleSignIn} />} */}
      <div>
        <Routes>
          <Route exact path="/" element={<Landing 
          handleLanguageChange={handleLanguageChange} 
          currentLanguage={currentLanguage}
          />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/categoria" element={<ShowCategory />} />
          <Route exact path="/contact" element={<ContactUs />} />
          <Route exact path="/changepass" element={<ChangePassword />} />
          <Route exact path="/dashboard" element={<Panel />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/home" element={<Home user={currentUser}
          userLocal={currentUserLocal}
          handleSignIn={handleSignIn}/>} />
          <Route exact path="/login" element={<Login currentLanguage={currentLanguage}/>} />
          <Route exact path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route exact path="/productid/:id" element={<ProductDetail />} />
          <Route exact path="/productidedit/:id" element={<EditProduct />} />
          <Route exact path="/producto" element={<Product />} />
          <Route exact path="/proveedor" element={<ProvidersAll />} />
          <Route exact path="/proveedoredit/:id" element={<EditProvider />} />
          <Route exact path="/rol" element={<Role />} />
          <Route exact path="/categoryedit/:id" element={<EditCategory />} />
          <Route exact path="/settings_product" element={<SettingsProduct />} />
          <Route exact path="/terms_&_conditions"  element={<TermsConditions />} />
          <Route exact path="/useredit/:id" element={<EditUser />} />
          <Route exact path="/usuario" element={<CreateUser />} />
          <Route exact path="/thankyoupage" element={<ThankYouPage />} />
          {/* <Route exact path="/chat/" element={<Chat />} /> */}
          <Route path="/dashboard" element={<Panel />} />
           
          {userActive.roleId === 1 
          ? <Route path="/settings" element={<Configuration />} />
          : null          
          }
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
        {showNavBar}
        <Footer currentLanguage={currentLanguage} handleLanguageChange={handleLanguageChange} />
      </div>
      </I18nextProvider>
    </>
  );
}

export default App;
