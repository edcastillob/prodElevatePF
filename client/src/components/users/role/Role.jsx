import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRole } from '../../../redux/actions/actions'; 
import styles from './Role.module.css'

export const Role = () => {
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
      alert("Exito");
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
          New Role
        </h4>      
        
        {/* Nombre de rol */}
              
        <input
        className="form-control mb-3 w-75"
        type="text"
        name="name"
        placeholder="Role name"
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
            placeholder="Enter Role Description..."
            value={role.description}
            onChange={handleChange}
          />
        <br />

        
        <button className={styles.create}>Create</button> 
        </form>
    </div>
    </div>
  )
}
