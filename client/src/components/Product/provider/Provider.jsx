import React, { useState } from 'react';

export const Provider = () => {
    const [provider, setProvider] = useState({
        isActive: false,
        name: '',
        address:'',
        phoneNumber:'',
        phoneNumberCompany:'',
        identification: '',
    });

    const handleChange = (event) => {
        event.preventDefault();
        setProvider({
          ...provider,
          [event.target.name]: event.target.value,
        });
    }

    const handleChangeCheckBox = (event) => {
        event.preventDefault();       
        setProvider({...provider, isActive : event.target.checked});
      }
  return (
    <div>
        
        <div className='container-sm'>

        <h1>provider</h1>      
        <hr />
        <form>
        
        <label htmlFor="isActive">active</label>
        <input
        className='form-check-input mt-10'
        type="checkbox"
        name='isActive'
        id='isActive'
        value={provider.isActive}
        onChange={handleChangeCheckBox}
        />
        <br />
        
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
        name="phoneNumber"
        value={provider.phoneNumber}
        onChange={handleChange}
      />
       
       {/* numero empresa telef de proveedor */}
       <label htmlFor="name">Number Phone company: </label>             
        <input
        className='form-control'
        type="text"
        name="phoneNumberCompany"
        value={provider.phoneNumberCompany}
        onChange={handleChange}
      />
        <br />

        <button className='btn btn-primary'>submit</button> 
        </form>
    </div>
    </div>
  )
}
