import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/actions/actions";
import styles from './Category.module.css'

export const Category = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

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
    console.log(category);
    dispatch(addCategory(category));
    alert("Exito");
    setCategory({
      name: "",
      description: "",
    });
  };
  return (
    <div>
      <div className={styles.container}>
        <ion-icon name="arrow-round-back"></ion-icon>
        <h2 className={styles.mainTitle}>Create New Category</h2>
        <hr />
        <form onSubmit={handleSubmit} className={styles.formContainer}>
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
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Category Name... "
            value={category.name}
            onChange={handleChange}
          />

          {/* Descripcion de categoria */}
          <label htmlFor="name">Description: </label>
          <textarea
            type="textarea"
            name="description"
            placeholder="Category Description..."
            value={category.description}
            onChange={handleChange}
          />
          <br />
          <button className={styles.btn}>Create Category</button>
        </form>
      </div>
    </div>
  );
};
