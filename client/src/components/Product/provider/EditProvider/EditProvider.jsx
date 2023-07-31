import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { UploadImg } from "../uploadImg/UploadImg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import styles from "./EditProvider.module.css";
import ReactQuill from "react-quill";
// import loadingImg from "../../../assets/loading.png";
import "react-quill/dist/quill.snow.css";
import {  useNavigate,useParams } from "react-router-dom";
import { editProvider, getProviderId } from "../../../../redux/actions/actions";
import validateForm from "./validation";


export const EditProvider = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate()
  const { id } = params;
  useEffect(() => {
    dispatch(getProviderId(id));
  }, [dispatch, id]);
  const provider = useSelector((state) => state.provider);
  if (provider && !provider.isActive) {
    provider.isActive = "f";
  }

  const [changeProvider, setChangeProvider] = useState({
    address: "",
    email: "",
    identification: "",
    isActive: "",
    name: "",
    numPhone: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (
      provider.address &&
      provider.email &&
      provider.identification &&
      provider.isActive &&
      provider.name &&
      provider.numPhone &&
      provider.country
    ) {
      setChangeProvider({
        address: provider.address,
        email: provider.email,
        identification: provider.identification,
        isActive: provider.isActive,
        name: provider.name,
        numPhone: provider.numPhone,
        country: provider.country,
      });
    }
  }, [
    provider.address,
    provider.email,
    provider.identification,
    provider.isActive,
    provider.name,
    provider.numPhone,
    provider.country,
  ]);

  const handleChange = (event) => {
    event.preventDefault();
    setChangeProvider({
      ...changeProvider,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Datos enviados: ", changeProvider);

    // const errors = validateForm (
    //   changeProvider.name,
    //   changeProvider.email,
    //   changeProvider.identification,
    //   changeProvider.address,
    //   changeProvider.isActive,
    //   changeProvider.numPhone,
    //   changeProvider.country
    // );
    // setErrors(errors);

    // if (Object.keys(errors).length === 0) {
      dispatch(editProvider(id, changeProvider));
      toast.success("¡Edit Provider successfully!");
      
      // setChangeProvider({
        //   address: "",
        //   email: "",
        //   identification: "",
        //   isActive: "",
        //   name: "",
        //   numPhone:"",  
        // });
        // setErrors({});
        navigate("/dashboard");
    // } else {
    //   toast.error("Data must be filled Correctly")
    // }

    // dispatch(editProvider(id, changeProvider));
    // toast.success("¡Edit Provider successfully!");
  };

  return (
    <div className={styles.container}>
      
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h4 style={{ fontFamily: "Poppins" }}>Edit Provider</h4>

          {/* Nombre de proveedor */}

          <input
            className="form-control mb-3 w-75"
            type="text"
            name="name"
            placeholder="Fullname"
            value={changeProvider.name}
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
            placeholder="DNI/RIF/Document ID"
            value={changeProvider.identification}
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
            value={changeProvider.email}
            onChange={handleChange}
          />
      {/* {errors.email && (
        <p className={styles.error}>{errors.email}</p>
      )} */}

          {/* direccion de proveedor */}
          <input
            className="form-control mb-3 w-75"
            type="textarea"
            name="address"
            placeholder="Address"
            value={changeProvider.address}
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
            placeholder="Phone N°"
            value={changeProvider.numPhone}
            onChange={handleChange}
          />
          {/* {errors.numPhone && (
            <p className={styles.error}>{errors.numPhone}</p>
          )} */}
          {/* Country proveedor */}
          <input
            className="form-control mb-3 w-75"
            type="text"
            name="country"
            placeholder="country"
            value={changeProvider.country}
            onChange={handleChange}
          />
          {/* {errors.country && (
            <p className={styles.error}>{errors.country}</p>
          )} */}

          {/* Estado del proveedor */}
          <select
            className="form-control mb-3 w-75"
            name="isActive"
            value={changeProvider.isActive}
            onChange={handleChange}
          >
            <option value="t">Activo</option>
            <option value="f">Inactivo</option>
          </select>
{/* {errors.isActive && (
  <p className={styles.error}>{errors.isActive}</p>
)} */}

          <br />

          <button className={styles.create}>Update Provider</button>
        </form>
      </div>
    
  );
};
