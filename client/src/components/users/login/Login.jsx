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
    try {
      console.log("desde submit: ", userData);
      dispatch(login(userData)); // Esperar a que la acción termine antes de redirigir
      window.location.reload(); // Forzar el refresco de la página
    } catch (error) {
      console.error(error.message);
      // Manejar el error, por ejemplo, mostrando un mensaje de error al usuario
    }
  };



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
