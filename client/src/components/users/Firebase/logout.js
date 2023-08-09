import { getAuth, signOut } from "firebase/auth";

export const logoutUser = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Usuario ha cerrado sesión");
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
};

export default logoutUser;
