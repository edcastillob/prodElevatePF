import { getAuth, signOut } from "firebase/auth";

export const logoutUser = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // El usuario ha cerrado sesión exitosamente
      console.log("Usuario ha cerrado sesión");
    })
    .catch((error) => {
      // Manejar cualquier error que pueda ocurrir al cerrar sesión
      console.error("Error al cerrar sesión:", error);
    });
};

export default logoutUser;
