import React, { useState } from "react";
import { addProvider } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import styles from "./Provider.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateForm from "./validation";

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
    const errors = validateForm (
      provider.name,
      provider.email,
      provider.address,
      provider.numPhone,
      provider.identification,
      provider.country
    );
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(addProvider(provider));
      toast.success("¡Provider created successfully!");
      setProvider({
        name: "",
        email: "",
        address: "",
        numPhone: "",
        identification: "",
        country: "",
      });
      setErrors({});
    } else {
      toast.error("Data is Incompleted. All fields must be filled Correctly");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h4 style={{ fontFamily: "Poppins", marginBottom: "1rem" }}>
          New Provider
        </h4>
        {/* Nombre de proveedor */}

        <input
          className="form-control mb-3 w-75"
          type="text"
          name="name"
          placeholder="Fullname"
          value={provider.name}
          onChange={handleChange}
        />
          {errors.name && (
            <p className={styles.error}>{errors.name}</p>
          )}

        {/* identificacion DNI RIF  de proveedor */}
        <input
          className="form-control mb-3 w-75"
          type="text"
          name="identification"
          placeholder="DNI/RIF/Document ID"
          value={provider.identification}
          onChange={handleChange}
        />
          {errors.identification && (
            <p className={styles.error}>{errors.identification}</p>
          )}

        {/* email  de proveedor */}
        <input
          className="form-control mb-3 w-75"
          type="email"
          name="email"
          placeholder="Email"
          value={provider.email}
          onChange={handleChange}
        />
          {errors.email && (
            <p className={styles.error}>{errors.email}</p>
          )}

        {/* Pais de proveedor */}
        <input
          className="form-control mb-3 w-75"
          type="textarea"
          name="country"
          placeholder="Country"
          value={provider.country}
          onChange={handleChange}
        />
          {errors.country && (
            <p className={styles.error}>{errors.country}</p>
          )}

        {/* direccion de proveedor */}
        <input
          className="form-control mb-3 w-75"
          type="textarea"
          name="address"
          placeholder="Address"
          value={provider.address}
          onChange={handleChange}
        />
          {errors.address && (
            <p className={styles.error}>{errors.address}</p>
          )}

          {/* numero telef de proveedor */}
          <input
            className="form-control mb-3 w-75"
            type="text"
            name="numPhone"
            placeholder="Phone N°"
            value={provider.numPhone}
            onChange={handleChange}
          />
          {errors.numPhone && (
            <p className={styles.error}>{errors.numPhone}</p>
          )}
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

        <button className={styles.create}>Create</button>
      </form>
    </div>
  );
};
