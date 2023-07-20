import React, { useState } from 'react';
import { UploadImg } from "../../Product/uploadImg/UploadImg";
import styles from './CreateUser.module.css';
import prueba from '../../../assets/prueba.jpg';
import logo from '../../../assets/logo_2.png'

import axios from 'axios';

export const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    identification: '',
    email: '',
    numPhone: '',
    address: '',
    password: '',
    role: '',
    images: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeRole = (event) => {
    event.preventDefault();
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users', userData);
      console.log(response.data); 
      setUserData({
        name: '',
        identification: '',
        email: '',
        numPhone: '',
        address: '',
        password: '',
        role: '',
        images: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = (imageUrl) => {
    setUserData((userData) => ({
      ...userData,
      images: imageUrl,
    }));
  };
  
    //-----------------------------------------------------------------------------
    const role = [
        { id: 1, name: "ADMIN", description: "Administrador del Sistema" },
        { id: 2, name: "client", description: "Cliente" },
        { id: 3, name: "vendedor", description: "Usuario final" },
      ];
      //-----------------------------------------------------------------------------

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
        <br />
        <button type="submit" className="btn btn-primary">Create</button>
      </form>

      </div>
      
    </div>
  );
};
