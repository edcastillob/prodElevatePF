import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRole } from '../../../redux/actions/actions'; 
import styles from './Role.module.css';
import validateForm from './validationRole';
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
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        event.preventDefault();
        setRole({
          ...role,
          [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event) => {
      event.preventDefault();  
      // console.log(role) 
      const errors = validateForm(
        role.name,
        role.description
      );
      setErrors(errors);

      if (Object.keys(errors).length === 0) {
        dispatch(addRole(role));
        toast.success(t("role.successfully", { lng: currentLanguage }));
        setRole({
          name: '',
          description:'',
        });
        setErrors({});
      } else {
        toast.error("Data is Incompleted. All fields must be filled Correctly");
      }
    };
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
      {errors.name && (
        <p className={styles.error}>{errors.name}</p>
      )}

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
          {errors.description && (
            <p className={styles.error}>{errors.description}</p>
          )}
        <br />

        
        <button className={styles.create}>{t("role.create", { lng: currentLanguage })}</button> 
        </form>
    </div>
    </div>
  )
}
