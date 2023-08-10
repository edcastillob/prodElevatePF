import React, { useState, useRef } from "react";

import styles from "./Forgot.module.css";
import prueba from "../../../assets/prueba.jpg";
import logo from "../../../assets/logo_2.png";
import google from "../../../assets/google.png";
import validate from "./validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addUser, verifyUser } from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import countriesData from "../../Country/db.json";
import { useTranslation } from 'react-i18next';

export const Forgot = ({ currentLanguage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    
    const { t } = useTranslation('global');
  
    const [userData, setUserData] = useState({ 
      email: "",
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
        if (Object.keys(errors).length > 0) {
          toast.error(
            t("create-user.toast-error", { lng: currentLanguage })
          );
          return;
        }
        dispatch(verifyUser(userData));
        toast.success(t("create-user.toast-success", { lng: currentLanguage }));
        navigate("/login");
      };
  // console.log(userData)
 
  return ( 
    <div className={styles.container}>
      <div className={styles.divLeft}>
        <div className={styles.divContent}>
          <img src={logo} alt="logo" />
          <h3 className={styles.title}>
            {t("create-user.prodelevate", { lng: currentLanguage })}
          </h3>
          <h4 className={styles.subtitle}>
          {t("create-user.the-best-tool", { lng: currentLanguage })}
          </h4>
        </div>
        <div className={styles.divImg}>
          <img src={prueba} alt="img-prueba" />
        </div>
      </div>

      {/* FORM SIGN UP  */}

      <div className={styles.divRight}>
        <div className={`${styles.form} ${styles.signup}`}>
          <div className={styles["form-content"]}>
            <h4 style={{fontFamily:'Poppins'}} >{t("create-user.forgot", { lng: currentLanguage })}</h4>
            <form onSubmit={handleSubmit}>
              
              {/* _____________EMAIL________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  onChange={handleInputChange}
                  value={userData.email}
                />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)} 
                </div>
              
              {/* _____________PASSWORD________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="password"
                  name="password"
                  placeholder={t("create-user.password", { lng: currentLanguage })}
                  className={`form-control ${errors.password && "is-invalid"}`}
                  onChange={handleInputChange}
                  value={userData.password}

                />
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              </div>
              {/* _____________CONFIRM PASSWORD________________ */}
              <div className={`${styles.field} ${styles["input-field"]} mb-4`}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder={t("create-user.confirm-password", { lng: currentLanguage })}
                  className={`form-control ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  onChange={handleInputChange}
                  value={userData.confirmPassword}

                />
                {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
              </div>
            
              <div >
                <button className={styles.create} type="submit">
                {t("create-user.confirm", { lng: currentLanguage })}
                </button>
              </div>
            </form>
            <div className={styles["form-link"]}>
              {/* <span>
              {t("create-user.already-have-account", { lng: currentLanguage })}{" "}
                <Link
                  to="/login"
                  className={`${styles.link} ${styles["login-link"]}`}
                >
                  {t("create-user.login", { lng: currentLanguage })}
                </Link>
              </span> */}
            </div>
          </div>     
          
        </div>
      </div>
    </div>
  );
};


