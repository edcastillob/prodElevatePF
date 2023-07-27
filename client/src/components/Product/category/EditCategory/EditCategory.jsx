import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../../redux/actions/actions';
import styles from './EditCategory.module.css'
import { useParams } from "react-router-dom";

export const EditCategory = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  
  
  const [editCategory, setEditCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    setEditCategory({
      ...editCategory,
      [event.target.name]: event.target.value,
    });
  };

  // const handleChangeCheckBox = (event) => {
  //     event.preventDefault();
  //     setEditeditCategory({...editCategory, isActive : event.target.checked});
  //   }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(editCategory);
    dispatch(addCategory(editCategory));
    alert("Exito");
    setEditCategory({
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
        <form onSubmit={ handleSubmit } className={styles.formContainer}>
        
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
        value={editCategory.name}
        onChange={handleChange}
      />

       {/* Descripcion de categoria */}
       <label htmlFor="name">Description: </label>             
        <textarea
        type="textarea"
        name="description"
        placeholder='editCategory Description...'
        value={editCategory.description}
        onChange={handleChange}
      />
        <br />
        <button className={styles.btn}>Create Category</button> 
        </form>
      </div>
    </div>
  );
};
