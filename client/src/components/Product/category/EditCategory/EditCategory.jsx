import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryEdit, getCategoryId } from "../../../../redux/actions/actions";
import styles from "./EditCategory.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (category.name && category.description) {
      setEditCategory({
        name: category.name,
        description: category.description,
      });
    }
  }, [category.name, category.description]);

  const handleChange = (event) => {
    event.preventDefault();
    setEditCategory({
      ...editCategory,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(editCategory);
    dispatch(categoryEdit(id, editCategory));
    toast.success("¡Updated successfully!");
    navigate("/settings");
  };
  // console.log("Edit category: ", editCategory);
  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h4 style={{ fontFamily: "Poppins", marginBottom: "1rem" }}>
            Edit Category
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
            placeholder="Category Name"
            value={editCategory.name}
            onChange={handleChange}
          />

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
            placeholder="Enter Category Description..."
            value={editCategory.description}
            onChange={handleChange}
          />
          <br />
          <button className={styles.create}>Update</button>
        </form>
      </div>
    </div>
  );
};
