// import { useEffect, useState } from 'react';
// import { useDispatch , useSelector} from 'react-redux';
// import { login } from '../../../redux/actions/actions'; 
// import { handleGoogleSignIn } from "../Firebase/GoogleLogin.js";
// import { useNavigate } from "react-router-dom";


// // import { userCredential } from './firebase/autentication.js'; // Asumiendo que exportas la función desde el archivo
// // import '../Firebase/autentication';


// export const Login = () => {
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);  

  
//   useEffect(() => {
//     if (user) {
//       navigate("/home"); // Redirige al home después del inicio de sesión exitoso
//     }
//   }, [user, navigate]);

//   const [userData, setUserData] = useState({
//     username: '',
//     password: '',
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((userData) => ({
//       ...userData,
//       [name]: value,
//     }));
//   };

//     const handleSubmit = (event) => {
//       event.preventDefault();  
//       console.log("desde submit: ", userData) 
//       dispatch(login(userData));      
//       // setUserData({
//       //   username: '',
//       //   password:'',
//       // });
//     }



//   return (
//     <div className="container">
//       <h1>Login</h1>  
      
//       <form onSubmit={handleSubmit}>

//         <div className="mb-3">
//           <label htmlFor="user" className="form-label">
//             User
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="username"
//             name="username"
//             value={userData.username}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             value={userData.password}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="mb-3">

//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>

//           <a href="/signup" className="ms-3">Sign Up</a>
//           <a href="/forgot-password" className="ms-3">Forgot your password</a>
//         </div>
//       </form>
//       <button type="button" onClick={handleGoogleSignIn} className="btn btn-info">Google</button>
//     </div>
//   );
// };


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/actions'; 
import { handleGoogleSignIn } from "../Firebase/GoogleLogin.js";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import google from "../../../assets/google.png"

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);  

  // Cargar datos del usuario desde el LocalStorage al inicio
  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("user");
    if (userDataFromLocalStorage) {
      const userData = JSON.parse(userDataFromLocalStorage);
      dispatch(login(userData));
      navigate("/home"); // Redirige al home si hay una sesión activa
    }
  }, [dispatch, navigate]);



  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();  
    console.log("desde submit: ", userData) 
    dispatch(login(userData));
    
    // Guardar los datos del usuario en el LocalStorage si el inicio de sesión es exitoso
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Redirige al home después del inicio de sesión exitoso
    navigate("/home");
    
    // setUserData({
    //   username: '',
    //   password:'',
    // });
  }

  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h4 style={{fontFamily:'Poppins', fontWeight: '600'}}>Login</h4>  

        <div className="mb-2 p-2">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder='Email'
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 p-2">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder='Password'
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
          <a href="/forgot-password" className={styles.link}>Forgot your password</a>

        <div className={styles.options}>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>

          <span className={styles.link}>Don't have an account? <a href="/usuario" className={styles.link}>Sign Up</a></span>
        </div>
        <div className={styles.google}>
          <div className={styles.line}></div>
          <button type="button" onClick={handleGoogleSignIn} className={styles.googleButton}>
            <img src={google} alt="Google" />
            Google
            </button>
        </div>
      </form>
    </div>
  );
};
