import React, { useState } from 'react';
import { UploadImg } from "../../Product/uploadImg/UploadImg";

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
        <UploadImg onImageUpload={handleImageUpload} />
        <br />
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};
