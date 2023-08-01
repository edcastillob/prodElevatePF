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

export const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [userData, setUserData] = useState({
    name: "",
    identification: "",
    email: "",
    numPhone: "",
    address: "",
    password: "",
    images: [],
  });

  const [errors, setErrors] = useState({});

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
        "Fill in the fields correctly before sending the information."
      );
      return;
    }
    dispatch(addUser(userData));
    toast.success("¡User created successfully!");
    navigate("/login");
  };

  const handleImageUpload = (imageUrl) => {
    setUserData((userData) => ({
      ...userData,
      images: imageUrl,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.divLeft}>
        <div className={styles.divContent}>
          <img src={logo} alt="logo" />
          <h3 className={styles.title}>
            Online Sales And Administration System
          </h3>
          <h4 className={styles.subtitle}>
            The best tool to see your business grow
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
            <h4>Create User</h4>
            <form onSubmit={handleSubmit}>
              {/* _____________NAME________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="text"
                  name="name"
                  placeholder="Fullname"
                  className={`form-control ${errors.name && "is-invalid"}`}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
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
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              {/* _____________ID________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="text"
                  name="identification"
                  placeholder="Document ID"
                  className={`form-control ${
                    errors.identification && "is-invalid"
                  }`}
                  onChange={handleInputChange}
                />
                {errors.identification && (
                  <div className="invalid-feedback">
                    {errors.identification}
                  </div>
                )}
              </div>
              {/* _____________PHONE NUMBER________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="text"
                  name="numPhone"
                  placeholder="Phone N°"
                  className={`form-control ${errors.numPhone && "is-invalid"}`}
                  onChange={handleInputChange}
                />
                {errors.numPhone && (
                  <div className="invalid-feedback">{errors.numPhone}</div>
                )}
              </div>
              {/* _____________ADDRESS________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className={`form-control ${errors.address && "is-invalid"}`}
                  onChange={handleInputChange}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>
              {/* _____________PASSWORD________________ */}
              <div className={`${styles.field} ${styles["input-field"]}`}>
                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              {/* _____________CONFIRM PASSWORD________________ */}
              <div className={`${styles.field} ${styles["input-field"]} mb-4`}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className={`form-control ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
                <div className={styles.uploadImg}>
              <UploadImg 
              onImageUpload={handleImageUpload}
              uploadedImages={userData.images}
              />
                </div>
              <br />
              <div className={`${styles.field} ${styles["button-field"]}`}>
                <button className={styles.create} type="submit">Create</button>
              </div>
            </form>
            <div className={styles["form-link"]}>
              <span>
                Already have an account?{" "}
                <Link to='/login'
                  className={`${styles.link} ${styles["login-link"]}`}
                > 
                  Login
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
              <span>Continue with Google</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
