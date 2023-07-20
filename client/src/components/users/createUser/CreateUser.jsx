import React, { useState } from 'react';
import { UploadImg } from "../../Product/uploadImg/UploadImg";

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
    <div className="container">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Identification:</label>
          <input
            type="text"
            name="identification"
            value={userData.identification}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input
            type="text"
            name="numPhone"
            value={userData.numPhone}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>       

        {/* <UploadImg onImageUpload={handleImageUpload} /> */}
       
        <UploadImg 
          onImageUpload={handleImageUpload} 
          uploadedImages={userData.images}
          clearUploadedImages={() => setUserData((userData) => ({ ...userData, images: [] }))}
        />
       

        <br />
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};


