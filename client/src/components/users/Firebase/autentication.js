import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from './showMessage.js'
import { useNavigate } from 'react-router-dom';


// export const userCredential = async ({ user, password }) => {
//   try {
//     const auth = getAuth();
//     await createUserWithEmailAndPassword(auth, user, password);
//     console.log(user)

//     // mensaje al registrarse
//     showMessage("Welcome: " + user, "success")


//   } catch (error) {
//     if (error.code === "auth/email-already-in-use") {    
//       showMessage('email already in use', 'error')
//     } else if (error.code === "auth/invalid-email") {
//       showMessage('Invalid email', 'error')
//     } else if (error.code === "auth/weak-password") {
//       showMessage('Password inavalid', 'error')
//     } else if (error.code) {
//       showMessage('Something went wrong', 'error')
//     }
//   }
// };

export const userCredential = async ({ user, password }) => {
  const navigate = useNavigate();

  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, user, password);
    console.log(user);

    // mensaje al autenticarse correctamente
    showMessage("Welcome: " + user, "success");

    // Redirigir a la página "/home" en caso de autenticación exitosa
    navigate("/home");

  } catch (error) {
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      showMessage('Invalid credentials', 'error');
    } else if (error.code) {
      showMessage('Something went wrong', 'error');
    }
  }
};
