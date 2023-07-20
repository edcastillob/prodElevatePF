import React, { useState } from 'react';
import { UploadImg } from "../../Product/uploadImg/UploadImg";
import styles from './CreateUser.module.css';
import prueba from '../../../assets/prueba.jpg';
import logo from '../../../assets/logo_2.png'

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/actions/actions';

export const CreateUser = () => {
  const dispatch = useDispatch();
 
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
      <div className={styles.divRight}>
      <h3>Create User</h3>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.divTwoItems}>
        <div className={styles.divContainer}>
          <label className={styles.labelContainer}>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className={styles.divContainer}>
          <label className={styles.labelContainer}>Identification:</label>
          <input
            type="text"
            name="identification"
            value={userData.identification}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        </div>
        <div className={styles.divTwoItems}>
        <div className={styles.divContainer}>
          <label className={styles.labelContainer}>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className={styles.divContainer}>
          <label className={styles.labelContainer}>Phone Number:</label>
          <input
            type="text"
            name="numPhone"
            value={userData.numPhone}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        </div>
        <div className={styles.divOneItem}>
        <div className={styles.divContainer}>
          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            className={styles.inputItem}
            required
          />
        </div>
        </div>
        <div className={styles.divOneItem}>
        <div className={styles.divContainer}>
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className={styles.inputItem}
            required
          />
        </div>       
<<<<<<< HEAD
        </div>
        <div className={styles.divOneItem}>
         <label htmlFor="category">Role:</label>
        <select
          className="form-select form-select-sm"
          name="role"
          id="role"
          value={userData.role}
          onChange={handleChangeRole}
        >
          <option value="">  -- select role --</option>
          {role?.sort().map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.name}
            </option>
          ))}
        </select>
        </div>
        <UploadImg onImageUpload={handleImageUpload} />
=======

        {/* <UploadImg onImageUpload={handleImageUpload} /> */}
       
        <UploadImg 
          onImageUpload={handleImageUpload} 
          uploadedImages={userData.images}
          clearUploadedImages={() => setUserData((userData) => ({ ...userData, images: [] }))}
        />
       

>>>>>>> c4238e1a16db0af9bad94741f587f6acff29669c
        <br />
        <button type="submit" className="btn btn-primary">Create</button>
      </form>

      </div>
      
    </div>
  );
};


