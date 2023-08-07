import React, { useState } from "react";
import { addProvider } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import styles from "./Provider.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateForm from "./validation";
import { useTranslation } from 'react-i18next';

export const Provider = ({ currentLanguage }) => {
  const { t } = useTranslation('global');
  const dispatch = useDispatch();
  const [provider, setProvider] = useState({
    name: "",
    email: "",
    address: "",
    numPhone: "",
    identification: "",
    country: "",
  });
  const [errors, setErrors] = useState({});


  const handleChange = (event) => {
    event.preventDefault();
    setProvider({
      ...provider,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(provider);
   

   
      dispatch(addProvider(provider));
      toast.success(t("provider.successfully", { lng: currentLanguage }));
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
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h4 style={{ fontFamily: "Poppins", marginBottom: "1rem" }}>
        {t("provider.new-provider", { lng: currentLanguage })}
        </h4>
        {/* Nombre de proveedor */}

        <input
          className="form-control mb-3 w-75"
          type="text"
          name="name"
          placeholder={t("provider.fullname", { lng: currentLanguage })}
          value={provider.name}
          onChange={handleChange}
        />
          {/* {errors.name && (
            <p className={styles.error}>{errors.name}</p>
          )} */}

        {/* identificacion DNI RIF  de proveedor */}
        <input
          className="form-control mb-3 w-75"
          type="text"
          name="identification"
          placeholder={t("provider.document", { lng: currentLanguage })}
          value={provider.identification}
          onChange={handleChange}
        />
          {/* {errors.identification && (
            <p className={styles.error}>{errors.identification}</p>
          )} */}

        {/* email  de proveedor */}
        <input
          className="form-control mb-3 w-75"
          type="email"
          name="email"
          placeholder="Email"
          value={provider.email}
          onChange={handleChange}
        />
          {/* {errors.email && (
            <p className={styles.error}>{errors.email}</p>
          )} */}

        {/* Pais de proveedor */}
        <input
          className="form-control mb-3 w-75"
          type="textarea"
          name="country"
          placeholder={t("provider.country", { lng: currentLanguage })}
          value={provider.country}
          onChange={handleChange}
        />
          {/* {errors.country && (
            <p className={styles.error}>{errors.country}</p>
          )} */}

        {/* direccion de proveedor */}
        <input
          className="form-control mb-3 w-75"
          type="textarea"
          name="address"
          placeholder={t("provider.address", { lng: currentLanguage })}
          value={provider.address}
          onChange={handleChange}
        />
          {/* {errors.address && (
            <p className={styles.error}>{errors.address}</p>
          )} */}

          {/* numero telef de proveedor */}
          <input
            className="form-control mb-3 w-75"
            type="text"
            name="numPhone"
            placeholder={t("provider.phone", { lng: currentLanguage })}
            value={provider.numPhone}
            onChange={handleChange}
          />
          {/* {errors.numPhone && (
            <p className={styles.error}>{errors.numPhone}</p>
          )} */}
          {/* country  de proveedor */}
          {/*<label htmlFor="name">country: </label>
          <input
            className="form-control"
            type="text"
            name="country"
            value={provider.country}
            onChange={handleChange}
          /> */}
        <br />

        <button className={styles.create}>{t("provider.create", { lng: currentLanguage })}</button>
      </form>
    </div>
  );
};
