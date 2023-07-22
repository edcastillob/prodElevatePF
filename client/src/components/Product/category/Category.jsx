import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../redux/actions/actions";

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
      <div className="container-sm">
        <h1>Category</h1>
        <hr />
        <form onSubmit={handleSubmit}>
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
            className="form-control"
            type="text"
            name="name"
            placeholder=" enter name "
            value={category.name}
            onChange={handleChange}
          />

          {/* Descripcion de categoria */}
          <label htmlFor="name">Description: </label>
          <input
            className="form-control"
            type="textarea"
            name="description"
            value={category.description}
            onChange={handleChange}
          />
          <br />

          <button className="btn btn-primary">submit</button>
        </form>
      </div>
    </div>
  );
};
