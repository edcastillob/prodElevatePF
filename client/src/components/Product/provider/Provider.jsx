import React, { useState } from 'react';
import { addProvider } from '../../../redux/actions/actions';
import { useDispatch } from 'react-redux';

export const Provider = () => {
  const dispatch = useDispatch();
    const [provider, setProvider] = useState({
        name: '',
        email: '',
        address:'',
        cellPhone:'',
        companyPhone:'',
        identification: '',
    });

    const handleChange = (event) => {
        event.preventDefault();
        setProvider({
          ...provider,
          [event.target.name]: event.target.value,
        });
    }
  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log(provider)  
    dispatch(addProvider(provider));
    alert("Exito");
    setProvider({
        name: '',
        email: '',
        address:'',
        cellPhone:'',
        companyPhone:'',
        identification: '',
    });
  }
  return (
    <div>
        
        <div className='container-sm'>

        <h1>provider</h1>      
        <hr />
        <form onSubmit={ handleSubmit }>        
       
        
        {/* Nombre de proveedor */}
        <label htmlFor="name">Provider: </label>        
        <input
        className='form-control'
        type="text"
        name="name"
        placeholder=" enter name "
        value={provider.name}
        onChange={handleChange}
      />

       {/* identificacion DNI RIF  de proveedor */}
       <label htmlFor="identification">RIF/ DNI/ Identification: </label>        
         <input
         className='form-control'
         type="text"
         name="identification"
         value={provider.identification}
         onChange={handleChange}
       />

       {/* email  de proveedor */}
       <label htmlFor="email">email: </label>        
         <input
         className='form-control'
         type="email"
         name="email"
         value={provider.email}
         onChange={handleChange}
       />

       {/* direccion de proveedor */}
       <label htmlFor="name">address: </label>             
        <input
        className='form-control'
        type="textarea"
        name="address"
        value={provider.address}
        onChange={handleChange}
      />       
        
       {/* numero telef de proveedor */}
       <label htmlFor="name">Number Phone: </label>             
        <input
        className='form-control'
        type="text"
        name="cellPhone"
        value={provider.cellPhone}
        onChange={handleChange}
      />
       
       {/* numero empresa telef de proveedor */}
       <label htmlFor="name">Number Phone company: </label>             
        <input
        className='form-control'
        type="text"
        name="companyPhone"
        value={provider.companyPhone}
        onChange={handleChange}
      />
        <br />

        <button className='btn btn-primary'>submit</button> 
        </form>
    </div>
    </div>
  )
}
