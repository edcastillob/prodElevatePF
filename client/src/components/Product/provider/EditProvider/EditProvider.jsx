import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { UploadImg } from "../uploadImg/UploadImg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import styles from "./EditProvider.module.css";
import ReactQuill from "react-quill";
// import loadingImg from "../../../assets/loading.png";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { editProvider, getProviderId } from "../../../../redux/actions/actions";


export const EditProvider = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  useEffect(() => {dispatch(getProviderId(id))}, [dispatch, id]);
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
    numPhone:"",  
    country: "",
  });
  
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
        country: provider.country
      });
    }
  }, [
    provider.address,
    provider.email,
    provider.identification,
    provider.isActive,
    provider.name,
    provider.numPhone,
    provider.country
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
    console.log("Datos enviados: ", changeProvider);
    dispatch(editProvider(id, changeProvider));
    toast.success("¡Edit Provider successfully!");
  };
 
  return (
    <div className={styles.container}>
    <div className={styles.divLeft}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h4 style={{fontFamily: 'Poppins'}}>Edit Provider</h4>

      {/* Nombre de proveedor */}
      
      <input
        className="form-control mb-3 w-75"
        type="text"
        name="name"
        placeholder= "Fullname"
        value={changeProvider.name}
        onChange={handleChange}
      />

      {/* identificacion DNI RIF  de proveedor */}
      <input
        className="form-control mb-3 w-75"
        type="text"
        name="identification"
        placeholder="DNI/RIF/Document ID"
        value={changeProvider.identification}
        onChange={handleChange}
      />

      {/* email  de proveedor */}
      <input
        className="form-control mb-3 w-75"
        type="email"
        name="email"
        placeholder="Email"
        value={changeProvider.email}
        onChange={handleChange}
      />

      {/* Pais de proveedor */}
      <input
            className="form-control mb-3 w-75"
            type="textarea"
            name="country"
            placeholder="Country"
            value={changeProvider.country}
            onChange={handleChange}
          />

      {/* direccion de proveedor */}
      <input
        className="form-control mb-3 w-75"
        type="textarea"
        name="address"
        placeholder="Address"
        value={changeProvider.address}
        onChange={handleChange}
      />

      {/* numero telef de proveedor */}
      <input
        className="form-control mb-3 w-75"
        type="text"
        name="numPhone"
        placeholder="Phone N°"
        value={changeProvider.numPhone}
        onChange={handleChange}
      />

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

      <br />

      <button className={styles.create}>update</button>
    </form>
  </div>
    <div className={styles.divRight}>
    </div>
  </div>

);
  
}
