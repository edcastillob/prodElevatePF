import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from './showMessage.js'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const userCredential = async ({ user, password }) => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, user, password);
    console.log(user)

    // mensaje al registrarse
    // showMessage("Welcome: " + user, "success")
    // toast.info("Welcome " + user.name);


  } catch (error) {
    if (error.code === "auth/email-already-in-use") {    
      showMessage('email already in use', 'error')
    } else if (error.code === "auth/invalid-email") {
      showMessage('Invalid email', 'error')
    } else if (error.code === "auth/weak-password") {
      showMessage('Password inavalid', 'error')
    } else if (error.code) {
      showMessage('Something went wrong', 'error')
    }
  }
};
