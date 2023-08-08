import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from './showMessage.js'




export const userCredential = async ({ user, password }) => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, user, password);
    console.log(user)

     showMessage("Welcome: " + user, "success")


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
