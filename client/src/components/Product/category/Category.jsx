import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/actions/actions";
import styles from "./Category.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateForm from './validation';
import { useTranslation } from 'react-i18next';

export const Category = ({ currentLanguage }) => {
  const { t } = useTranslation('global');
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [errors, serErrors] = useState({});

  const handleChange = (event) => {
    event.preventDefault();
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };

  // const handleChangeCheckBox = (event) => {
  //     event.preventDefault();
  //     setCategory({...category, isActive : event.target.checked});
  //   }
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(category);
    const errors = validateForm(
      category.name,
      category.description,
    );
    serErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(addCategory(category));
      toast.success(t("category.successfully", { lng: currentLanguage }));
      setCategory({
        name: "",
        description: "",
      });
      serErrors({});
    } else {
      toast.error(t("category.incompleted", { lng: currentLanguage }));
    }
  };
  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h4 style={{ fontFamily: "Poppins", marginBottom: "1rem" }}>
          {t("category.new-category", { lng: currentLanguage })}
          </h4>
          {/* <label htmlFor="isActive">active</label>
        <input
        className='form-check-input mt-10'
        type="checkbox"
        name='isActive'
        id='isActive'
        value={category.isActive}
        onChange={handleChangeCheckBox}
        />
        <br /> */}

          {/* Nombre de categoria */}
          <input
            className="form-control mb-3 w-75"
            type="text"
            name="name"
            placeholder={t("category.category-name", { lng: currentLanguage })}
            value={category.name}
            onChange={handleChange}
          />
      {errors.name && (
        <p className={styles.error}>{errors.name}</p>
      )}

          {/* Descripcion de categoria */}
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
            placeholder={t("category.category-description", { lng: currentLanguage })}
            value={category.description}
            onChange={handleChange}
          />
        {errors.description && (
        <p className={styles.error}>{errors.description}</p>
      )}
        <br />
          <button className={styles.create}>{t("category.create", { lng: currentLanguage })}</button>
        </form>
      </div>
    </div>
  );
};
