import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRole } from '../../../redux/actions/actions'; 
import styles from './Role.module.css';
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Role = ({ currentLanguage }) => {
  const { t } = useTranslation('global');
  const dispatch = useDispatch();
    const [role, setRole] = useState({        
        name: '',
        description:'',
    });    

    const handleChange = (event) => {
        event.preventDefault();
        setRole({
          ...role,
          [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event) => {
      event.preventDefault();  
      console.log(role) 
      dispatch(addRole(role));
      toast.success(t("role.successfully", { lng: currentLanguage }));
      setRole({
        name: '',
        description:'',
      });
    }
  return (
    <div>
        
        <div className={styles.container}>

        <hr />
        <form onSubmit={ handleSubmit } className={styles.formContainer}>
        <h4 style={{ fontFamily: "Poppins", marginBottom: "1rem" }}>
        {t("role.new-role", { lng: currentLanguage })}
        </h4>      
        
        {/* Nombre de rol */}
              
        <input
        className="form-control mb-3 w-75"
        type="text"
        name="name"
        placeholder={t("role.role-name", { lng: currentLanguage })}
        value={role.name}
        onChange={handleChange}
      />

       {/* Descripcion de rol */}
                  
      <textarea
            type="textarea"
            name="description"
            className="form-control"
            style={{
              resize: "none",
              width: "75%",
              height: "30%",
              fontFamily: "Poppins",
            }}
            placeholder={t("role.role-description", { lng: currentLanguage })}
            value={role.description}
            onChange={handleChange}
          />
        <br />

        
        <button className={styles.create}>{t("role.create", { lng: currentLanguage })}</button> 
        </form>
    </div>
    </div>
  )
}
