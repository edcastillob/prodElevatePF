import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  categoryEdit, getCategoryId } from '../../../../redux/actions/actions';
import styles from './EditCategory.module.css'
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params; 


  
  const category = useSelector((state) => state.category);
  const [editCategory, setEditCategory] = useState({
    name: category.name,
    description: category.description,
  });
  
  useEffect(() => {    
    dispatch(getCategoryId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      category.name &&
      category.description 
    ) {      
      setEditCategory({
        name: category.name,
        description: category.description
      });
    }
  }, [
    category.name,
    category.description
  ]);

  const handleChange = (event) => {
    event.preventDefault();
    setEditCategory({
      ...editCategory,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(editCategory);
    dispatch(categoryEdit(id, editCategory));
    alert("successfully updated"); 
    navigate("/settings");
  };
  console.log("Edit category: ", editCategory)
  return (
    <div>
        
        <div className={styles.container}>
        <ion-icon name="arrow-round-back"></ion-icon>
        <h2 className={styles.mainTitle}>Create New Category</h2>      
        <hr />

        <form onSubmit={ handleSubmit } className={styles.formContainer}>   
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
        <button className={styles.btn}>Update Category</button> 
        </form>
      </div>
    </div>
  );
};
