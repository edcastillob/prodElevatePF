import React, { useState, useRef } from 'react';
import { UploadImg } from "../../Product/uploadImg/UploadImg";
import styles from './CreateUser.module.css';
import prueba from '../../../assets/prueba.jpg';
import logo from '../../../assets/logo_2.png';
import facebook from '../../../assets/facebook.png';
import google from '../../../assets/google.png';

// import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { addUser } from '../../../redux/actions/actions';


export const CreateUser = () => {
// GOOGLE FORM
  const [showPassword, setShowPassword] = useState(false);
  const formsRef = useRef(null);
//
  const dispatch = useDispatch();


// GOOGLE FORM HANDLERS
const handlePasswordToggle = () => {
  setShowPassword((prevShowPassword) => !prevShowPassword);
};

const handleLinkClick = (e) => {
  e.preventDefault();
  formsRef.current.classList.toggle(styles['show-signup']);
};
//

let cleanImg = [];
  const [userData, setUserData] = useState({
    name: '',
    identification: '',
    email: '',
    numPhone: '',
    address: '',
    password: '',
    images: [],
  });
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 

  const handleSubmit = (event) => {
    event.preventDefault();  
    console.log(userData) 
    dispatch(addUser(userData));
    alert("Exito");
    setUserData({
      name: '',
      identification: '',
      email: '',
      numPhone: '',
      address: '',
      password: '',
      images: cleanImg,
    });
  }

  
  

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
        <h3 className={styles.title}>Online Sales And Administration System</h3>
        <h4 className={styles.subtitle}>The best tool to see your business grow</h4>
        </div>
        <div className={styles.divImg}>
        <img src={prueba} alt="img-prueba" />
        </div>
      </div>

      {/* FORM SIGN UP  */}

      <div className={styles.divRight}>
      <div className={`${styles.form} ${styles.signup}`}>
          <div className={styles['form-content']}>
            <header>Create User</header>
            <form onSubmit={handleSubmit}>
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="text" 
                name='name' 
                placeholder="Name" 
                className={styles.input}
                onChange={handleInputChange} />
              </div>
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="text" 
                name='identification' 
                placeholder="N° ID" 
                className={styles.input}
                onChange={handleInputChange} />
              </div>
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="text" 
                name='numPhone' 
                placeholder="Phone Number" 
                className={styles.input}
                onChange={handleInputChange} />
              </div>
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="text" 
                name='address' 
                placeholder="Address" 
                className={styles.input}
                onChange={handleInputChange} />
              </div>
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="email" 
                name='email' 
                placeholder="Email" 
                className={styles.input}
                onChange={handleInputChange} />
              </div>
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="password" 
                name='password' 
                placeholder="Create password" 
                className={styles.password}
                onChange={handleInputChange} />
              </div>
              
              {/* <div className={`${styles.field} ${styles['input-field']}`}>
                <input type="password" placeholder="Confirm password" className={styles.password} />
                <i className={`bx bx-hide ${styles['eye-icon']}`}></i>
              </div> */}
              <label><h6>Profile Picture</h6></label>
              <UploadImg onImageUpload={handleImageUpload} />
              <br />
              <div className={`${styles.field} ${styles['button-field']}`}>
                <button type='submit'>Create</button>
              </div>
            </form>
            <div className={styles['form-link']}>
              <span>
                Already have an account? <a href="#" className={`${styles.link} ${styles['login-link']}`}>Login</a>
              </span>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles['media-options']}>
            <a href="#" className={`${styles.field} ${styles.facebook}`}>
              <img src={facebook}  className={styles['facebook-icon']} />

              {/* <i className={`bx bxl-facebook ${styles['facebook-icon']}`}></i> */}
              <span>Continue with Facebook</span>
            </a>
          </div>
          <div className={styles['media-options']}>
            <a href="#" className={`${styles.field} ${styles.google}`}>
              <img src={google} alt="" className={styles['google-img']} />
              <span>Continue with Google</span>
            </a>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};


