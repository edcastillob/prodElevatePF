import React, { useState, useRef } from 'react';
import { UploadImg } from "../../Product/uploadImg/UploadImg";
import styles from './CreateUser.module.css';
import prueba from '../../../assets/prueba.jpg';
import logo from '../../../assets/logo_2.png';
import facebook from '../../../assets/facebook.png';
import google from '../../../assets/google.png';
import validate from './validation'

// import axios from 'axios';

import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/actions/actions';



export const CreateUser = () => {

  const dispatch = useDispatch();




let cleanImg = [];
  const [userData, setUserData] = useState({
    name: '',
    identification: '',
    email: '',
    numPhone: '',
    address: '',
    password: '',
    images: [],
  });

  const [errors, setErrors] = useState({})

  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setErrors(validate({
      ...userData,
      [name]: value,
    }))
  };

 

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (Object.keys(errors).length > 0) {
      alert("Por favor, completa los campos correctamente antes de enviar la información.");
      return;
    }
    

    console.log(userData) 
    dispatch(addUser(userData));
    alert("Exito");
    setUserData({
      name: '',
      identification: '',
      email: '',
      numPhone: '',
      address: '',
      password: '',
      images: cleanImg,
    });
  }

  
  

  const handleImageUpload = (imageUrl) => {
    setUserData((userData) => ({
      ...userData,
      images: imageUrl,
    }));
  
  };

 
  


  return (
    <div className={styles.container}>
      <div className={styles.divLeft}>
        <div className={styles.divContent}>
        <img src={logo} alt="logo" />
        <h3 className={styles.title}>Online Sales And Administration System</h3>
        <h4 className={styles.subtitle}>The best tool to see your business grow</h4>
        </div>
        <div className={styles.divImg}>
        <img src={prueba} alt="img-prueba" />
        </div>
      </div>

      {/* FORM SIGN UP  */}

      <div className={styles.divRight}>
      <div className={`${styles.form} ${styles.signup}`}>
          <div className={styles['form-content']}>
            <h4>Create User</h4>
            <form onSubmit={handleSubmit}>
              {/* _____________NAME________________ */}
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="text" 
                name='name' 
                placeholder="Fullname" 
                className={`form-control ${errors.name && 'is-invalid'}`}
                onChange={handleInputChange} />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              {/* _____________EMAIL________________ */}
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="email" 
                name='email' 
                placeholder="Email" 
                className={`form-control ${errors.email && 'is-invalid'}`}
                onChange={handleInputChange} />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              {/* _____________ID________________ */}
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="text" 
                name='identification' 
                placeholder="Document ID" 
                className={`form-control ${errors.identification && 'is-invalid'}`}
                onChange={handleInputChange}/>
                {errors.identification && <div className="invalid-feedback">{errors.identification}</div>}
              </div>
              {/* _____________PHONE NUMBER________________ */}
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="text" 
                name='numPhone' 
                placeholder="Phone N°" 
                className={`form-control ${errors.numPhone && 'is-invalid'}`}
                onChange={handleInputChange} />
                {errors.numPhone && <div className="invalid-feedback">{errors.numPhone}</div>}
              </div>
              {/* _____________ADDRESS________________ */}
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="text" 
                name='address' 
                placeholder="Address" 
                className={`form-control ${errors.address && 'is-invalid'}`}
                onChange={handleInputChange} />
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>
              {/* _____________PASSWORD________________ */}
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                type="password" 
                name='password' 
                placeholder="Create password" 
                className={`form-control ${errors.password && 'is-invalid'}`}
                onChange={handleInputChange} />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              {/* _____________CONFIRM PASSWORD________________ */}
              <div className={`${styles.field} ${styles['input-field']}`}>
                <input 
                  type="password" 
                  name='confirmPassword' 
                  placeholder="Confirm password" 
                  className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                  onChange={handleInputChange} />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

              <UploadImg onImageUpload={handleImageUpload} />
              <br />
              <div className={`${styles.field} ${styles['button-field']}`}>
                <button type='submit'>Create</button>
              </div>
            </form>
            <div className={styles['form-link']}>
              <span>
                Already have an account? <a href="#" className={`${styles.link} ${styles['login-link']}`}>Login</a>
              </span>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.social}>
            <a href="#" style={{textDecoration:'none', display:'flex', 
            alignItems:'center',
            gap:'1rem'}}>
              <img src={google} alt="Google" />
              <span>Continue with Google</span>
            </a>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};


// import React, { useState } from 'react';
// import { UploadImg } from "../../Product/uploadImg/UploadImg";
// import styles from './CreateUser.module.css';
// import prueba from '../../../assets/prueba.jpg';
// import logo from '../../../assets/logo_2.png';
// import google from '../../../assets/google.png';
// import validate from './validation';

// import { useDispatch } from 'react-redux';
// import { addUser } from '../../../redux/actions/actions';

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, setDoc, doc } from "firebase/firestore";

// export const CreateUser = () => {
//   const dispatch = useDispatch();

//   let cleanImg = [];
//   const [userData, setUserData] = useState({
//     name: '',
//     identification: '',
//     email: '',
//     numPhone: '',
//     address: '',
//     password: '',
//     images: [],
//   });

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setErrors(validate({
//       ...userData,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = (imageUrl) => {
//     setUserData((userData) => ({
//       ...userData,
//       images: imageUrl,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       console.log("desde submit: ", userData);

//       // Obtener username y password desde userData usando desestructuración
//       const { email, password } = userData;

//       const auth = getAuth();
//       const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredentials.user;

//       // Agregar más datos al usuario utilizando Firestore
//       const db = getFirestore();
//       const userRef = doc(db, "users", user.uid); // Asumiendo que tienes una colección "users" en Firestore
//       const userDataToSave = {
//         email: user.email,
//         name: userData.name,
//         identification: userData.identification,
//         numPhone: userData.numPhone,
//         address: userData.address,
//         images: userData.images,
//         // Agrega aquí más campos que deseas guardar en Firestore
//       };
//       await setDoc(userRef, userDataToSave, { merge: true });

//       // Hacer algo con el usuario si es necesario
//       console.log('Usuario creado:', user);

//       // Limpiar el formulario después de crear el usuario
//       setUserData({
//         name: '',
//         identification: '',
//         email: '',
//         numPhone: '',
//         address: '',
//         password: '',
//         images: cleanImg,
//       });

//       // Mostrar un mensaje de éxito o redirigir a otra página
//       alert("Usuario creado exitosamente");
//       // Puedes redirigir a otra página después de crear el usuario
//       // navigate("/home");
//     } catch (error) {
//       // Manejar el error si es necesario
//       console.error('Error al crear usuario:', error);
//     }
//   };

  


//   return (
//     <div className={styles.container}>
//       <div className={styles.divLeft}>
//         <div className={styles.divContent}>
//         <img src={logo} alt="logo" />
//         <h3 className={styles.title}>Online Sales And Administration System</h3>
//         <h4 className={styles.subtitle}>The best tool to see your business grow</h4>
//         </div>
//         <div className={styles.divImg}>
//         <img src={prueba} alt="img-prueba" />
//         </div>
//       </div>

//       {/* FORM SIGN UP  */}

//       <div className={styles.divRight}>
//       <div className={`${styles.form} ${styles.signup}`}>
//           <div className={styles['form-content']}>
//             <h4>Create User</h4>
//             <form onSubmit={handleSubmit}>
//               {/* _____________NAME________________ */}
//               <div className={`${styles.field} ${styles['input-field']}`}>
//                 <input 
//                 type="text" 
//                 name='name' 
//                 placeholder="Fullname" 
//                 className={`form-control ${errors.name && 'is-invalid'}`}
//                 onChange={handleInputChange} />
//               {errors.name && <div className="invalid-feedback">{errors.name}</div>}
//               </div>
//               {/* _____________EMAIL________________ */}
//               <div className={`${styles.field} ${styles['input-field']}`}>
//                 <input 
//                 type="email" 
//                 name='email' 
//                 placeholder="Email" 
//                 className={`form-control ${errors.email && 'is-invalid'}`}
//                 onChange={handleInputChange} />
//                 {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//               </div>
//               {/* _____________ID________________ */}
//               <div className={`${styles.field} ${styles['input-field']}`}>
//                 <input 
//                 type="text" 
//                 name='identification' 
//                 placeholder="Document ID" 
//                 className={`form-control ${errors.identification && 'is-invalid'}`}
//                 onChange={handleInputChange}/>
//                 {errors.identification && <div className="invalid-feedback">{errors.identification}</div>}
//               </div>
//               {/* _____________PHONE NUMBER________________ */}
//               <div className={`${styles.field} ${styles['input-field']}`}>
//                 <input 
//                 type="text" 
//                 name='numPhone' 
//                 placeholder="Phone N°" 
//                 className={`form-control ${errors.numPhone && 'is-invalid'}`}
//                 onChange={handleInputChange} />
//                 {errors.numPhone && <div className="invalid-feedback">{errors.numPhone}</div>}
//               </div>
//               {/* _____________ADDRESS________________ */}
//               <div className={`${styles.field} ${styles['input-field']}`}>
//                 <input 
//                 type="text" 
//                 name='address' 
//                 placeholder="Address" 
//                 className={`form-control ${errors.address && 'is-invalid'}`}
//                 onChange={handleInputChange} />
//                 {errors.address && <div className="invalid-feedback">{errors.address}</div>}
//               </div>
//               {/* _____________PASSWORD________________ */}
//               <div className={`${styles.field} ${styles['input-field']}`}>
//                 <input 
//                 type="password" 
//                 name='password' 
//                 placeholder="Create password" 
//                 className={`form-control ${errors.password && 'is-invalid'}`}
//                 onChange={handleInputChange} />
//                 {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//               </div>
//               {/* _____________CONFIRM PASSWORD________________ */}
//               <div className={`${styles.field} ${styles['input-field']}`}>
//                 <input 
//                   type="password" 
//                   name='confirmPassword' 
//                   placeholder="Confirm password" 
//                   className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
//                   onChange={handleInputChange} />
//                 {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
//               </div>

//               <UploadImg onImageUpload={handleImageUpload} />
//               <br />
//               <div className={`${styles.field} ${styles['button-field']}`}>
//                 <button type='submit'>Create</button>
//               </div>
//             </form>
//             <div className={styles['form-link']}>
//               <span>
//                 Already have an account? <a href="#" className={`${styles.link} ${styles['login-link']}`}>Login</a>
//               </span>
//             </div>
//           </div>
//           <div className={styles.line}></div>
//           <div className={styles.social}>
//             <a href="#" style={{textDecoration:'none', display:'flex', 
//             alignItems:'center',
//             gap:'1rem'}}>
//               <img src={google} alt="Google" />
//               <span>Continue with Google</span>
//             </a>
//           </div>
//         </div>
//       </div>
      
      
//     </div>
//   );
// };