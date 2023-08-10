import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    auth.languageCode = 'it';
  
    try {
      const result = await signInWithPopup(auth, provider);      
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;    
      const user = result.user;
      // console.log("Usuario autenticado con Facebook:", result.user);
  
     
        toast.info('Welcome ' + result.user.displayName, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          })
    } catch (error) {
      // Handle Errors 
      const errorCode = error.code;
      const errorMessage = error.message;
      
      const email = error.customData.email;
      
      const credential = FacebookAuthProvider.credentialFromError(error);
     
      // console.log("Error al autenticar con Facebook:", error);
    }
  };
  