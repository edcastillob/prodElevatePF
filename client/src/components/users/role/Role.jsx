import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRole } from '../../../redux/actions/actions'; 

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
        
        <div className='container-sm'>

        <h1>role</h1>      
        <hr />
        <form onSubmit={ handleSubmit }>
        
        {/* Nombre de rol */}
        <label htmlFor="name">Name: </label>        
        <input
        className='form-control'
        type="text"
        name="name"
        placeholder=" enter name "
        value={role.name}
        onChange={handleChange}
      />

       {/* Descripcion de rol */}
       <label htmlFor="name">Description: </label>             
        <input
        className='form-control'
        type="textarea"
        name="description"
        value={role.description}
        onChange={handleChange}
      />
        <br />

        
        <button className='btn btn-primary'>submit</button> 
        </form>
    </div>
    </div>
  )
}
