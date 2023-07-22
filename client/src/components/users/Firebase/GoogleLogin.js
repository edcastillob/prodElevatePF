import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";




export const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    auth.languageCode = 'it';
  
    try {
      const result = await signInWithPopup(auth, provider);      
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;    
      const user = result.user;
      console.log("Usuario autenticado con Google:", result.user);
  
     
        alert('Welcome ' + result.user.displayName)
    } catch (error) {
      // Handle Errors 
      const errorCode = error.code;
      const errorMessage = error.message;
      
      const email = error.customData.email;
      
      const credential = GoogleAuthProvider.credentialFromError(error);
     
      console.log("Error al autenticar con Google:", error);
    }
  };
  