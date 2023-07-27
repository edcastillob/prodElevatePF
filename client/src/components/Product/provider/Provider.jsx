import React, { useState } from "react";
import { addProvider } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import styles from "./Provider.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Provider = () => {
  const dispatch = useDispatch();
  const [provider, setProvider] = useState({
    name: "",
    email: "",
    address: "",
    numPhone: "",
    identification: "",
    country: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    setProvider({
      ...provider,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(provider);
    dispatch(addProvider(provider));
    toast.success('¡Provider created successfully!');
    setProvider({
      name: "",
      email: "",
      address: "",
      numPhone: "",
      identification: "",
      country: "",
    });
  };
  return (
    <div className={styles.container}>
        <div className={styles.divLeft}>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h4 style={{fontFamily: 'Poppins', marginBottom:'1rem'}}>New Provider</h4>
          {/* Nombre de proveedor */}
          
          <input
            className="form-control mb-3 w-75"
            type="text"
            name="name"
            placeholder= "Fullname"
            value={provider.name}
            onChange={handleChange}
          />

          {/* identificacion DNI RIF  de proveedor */}
          <input
            className="form-control mb-3 w-75"
            type="text"
            name="identification"
            placeholder="DNI/RIF/Document ID"
            value={provider.identification}
            onChange={handleChange}
          />

          {/* email  de proveedor */}
          <input
            className="form-control mb-3 w-75"
            type="email"
            name="email"
            placeholder="Email"
            value={provider.email}
            onChange={handleChange}
          />

          {/* Pais de proveedor */}
          <input
            className="form-control mb-3 w-75"
            type="textarea"
            name="country"
            placeholder="Country"
            value={provider.country}
            onChange={handleChange}
          />

          {/* direccion de proveedor */}
          <input
            className="form-control mb-3 w-75"
            type="textarea"
            name="address"
            placeholder="Address"
            value={provider.address}
            onChange={handleChange}
          />

          {/* numero telef de proveedor */}
          <input
            className="form-control mb-3 w-75"
            type="text"
            name="numPhone"
            placeholder="Phone N°"
            value={provider.numPhone}
            onChange={handleChange}
          />

          <br />

          <button className={styles.create}>Create</button>
        </form>
      </div>
        <div className={styles.divRight}>
        </div>
      </div>

  );
};
