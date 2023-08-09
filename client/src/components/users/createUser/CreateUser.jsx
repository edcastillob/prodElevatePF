import React, { useState, useRef } from "react";
import { UploadImg } from "../../Product/uploadImg/UploadImg";
import styles from "./CreateUser.module.css";
import prueba from "../../../assets/prueba.jpg";
import logo from "../../../assets/logo_2.png";
import google from "../../../assets/google.png";
import validate from "./validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import countriesData from "../../Country/db.json";
import { useTranslation } from 'react-i18next';

export const CreateUser = ({ currentLanguage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('global');

  const [selectedCountry, setSelectedCountry] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    identification: "",
    email: "",
    numPhone: "",
    address: "",
    country: "",
    password: "",
    images: [],
  });

  const [errors, setErrors] = useState({});

  const compareCountries = (a, b) => {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  };

  const sortedCountries = countriesData.countries.sort(compareCountries);

  const handleCountrySelect = (event) => { 
    event.preventDefault();
    const countryValue = event.target.value; 
    setSelectedCountry(countryValue); 
    setUserData((userData) => ({
      ...userData,
      country: countryValue, 
    }));
  }
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,     
    }));
    setErrors(
      validate({
        ...userData,
        [name]: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error(
        t("create-user.toast-error", { lng: currentLanguage })
      );
      return;
    }
    dispatch(addUser(userData));
    toast.success(t("create-user.toast-success", { lng: currentLanguage }));
    navigate("/login");
  };

  const handleImageUpload = (imageUrl) => {
    setUserData((userData) => ({
      ...userData,
      images: imageUrl,
    }));
  };
  // console.log(userData)
  // console.log(selectedCountry)
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
            <h4 style={{fontFamily:'Poppins'}} >{t("create-user.create-user", { lng: currentLanguage })}</h4>
            <form onSubmit={handleSubmit}>
              {/* _____________NAME________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="text"
                  name="name"
                  placeholder={t("create-user.fullname", { lng: currentLanguage })}
                  className={`form-control ${errors.name && "is-invalid"}`}
                  onChange={handleInputChange}
                />
                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
              </div>
              {/* _____________EMAIL________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  onChange={handleInputChange}
                />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)} 
                </div>
              {/* _____________ID________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="text"
                  name="identification"
                  placeholder={t("create-user.document", { lng: currentLanguage })}
                  className={`form-control ${
                    errors.identification && "is-invalid"
                  }`}
                  onChange={handleInputChange}
                />
                {errors.identification && (<div className="invalid-feedback">{errors.identification}</div>)}
              </div>
              {/* _____________PHONE NUMBER________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="text"
                  name="numPhone"
                  placeholder={t("create-user.phone", { lng: currentLanguage })}
                  className={`form-control ${errors.numPhone && "is-invalid"}`}
                  onChange={handleInputChange}
                />
                {errors.numPhone && (<div className="invalid-feedback">{errors.numPhone}</div>)}
              </div>
              {/* _____________ADDRESS________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="text"
                  name="address"
                  placeholder={t("create-user.address", { lng: currentLanguage })}
                  className={`form-control ${errors.address && "is-invalid"}`}
                  onChange={handleInputChange}
                />
                {errors.address && (<div className="invalid-feedback">{errors.address}</div>)}
              </div>
              {/* _____________country________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <select
                  className="form-control"
                  name="country"
                  onChange={handleCountrySelect}
                >
                  <option value="">{t("create-user.select-country", { lng: currentLanguage })}</option>
                  {sortedCountries.map((country) => (
                    <option key={country.cca3} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
              </div>

              {/* _____________PASSWORD________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="password"
                  name="password"
                  placeholder={t("create-user.password", { lng: currentLanguage })}
                  className={`form-control ${errors.password && "is-invalid"}`}
                  onChange={handleInputChange}
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
                />
                {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
              </div>
              <div className={styles.uploadImg}>
                <UploadImg
                  onImageUpload={handleImageUpload}
                  uploadedImages={userData.images}
                />
              </div>
              {/* <br /> */}
              <div >
                <button className={styles.create} type="submit">
                {t("create-user.create", { lng: currentLanguage })}
                </button>
              </div>
            </form>
            <div className={styles["form-link"]}>
              <span>
              {t("create-user.already-have-account", { lng: currentLanguage })}{" "}
                <Link
                  to="/login"
                  className={`${styles.link} ${styles["login-link"]}`}
                >
                  {t("create-user.login", { lng: currentLanguage })}
                </Link>
              </span>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.social}>
            <a
              href="#"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img src={google} alt="Google" />
              <span>{t("create-user.continue-with-google", { lng: currentLanguage })}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


