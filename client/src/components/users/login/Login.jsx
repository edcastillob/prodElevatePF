import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/actions/actions";
import { handleGoogleSignIn } from "../Firebase/GoogleLogin.js";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import google from "../../../assets/google.png"
import validateForm from './validation';
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUser(user);
        navigate("/home");
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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
      // console.log("desde submit: ", userData);
      const errors = validateForm(
        userData.username, 
      );
      setErrors(errors);

      if (Object.keys(errors).length === 0) {
        dispatch(login(userData)); // Esperar a que la acción termine antes de redirigir
        navigate("/home");
        setUserData({
          username: '',
          password: ''
        })
        setErrors({});
      } else {
        toast.error("Error");
      }

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h4 style={{ fontFamily: "Poppins", fontWeight: "600" }}>Login</h4>

        <div className="mb-2 p-2">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Email"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>
        {errors.username && (
          <p className={styles.error}>{errors.username}</p>
        )}        

        <div className="mb-2 p-2">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <a href="/forgot-password" className={styles.link}>
          Forgot your password
        </a>

        <div className={styles.options}>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>

          <span className={styles.link}>
            Don't have an account?{" "}
            <a href="/usuario" className={styles.link}>
              Sign Up
            </a>
          </span>
        </div>
        <div className={styles.google}>
          <div className={styles.line}></div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className={styles.googleButton}
          >
            <img src={google} alt="Google" />
            Google
          </button>
        </div>
      </form>
    </div>
  );
};
