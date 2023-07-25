
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


// Por ejemplo, dentro de una función async
const handleRegistration = async () => {
    const username = 'user@example.com';
    const password = 'secretpassword';
  
    try {
      const user = await createUserWithEmailAndPasswordAsync(email, password);
      // Hacer algo con el usuario si es necesario
      console.log('Usuario creado:', user);
    } catch (error) {
      // Manejar el error si es necesario
      console.error('Error al crear usuario:', error);
    }
  };
  