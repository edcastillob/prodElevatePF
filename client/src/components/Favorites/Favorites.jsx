import { useDispatch, useSelector } from "react-redux";
import styles from "./Favorites.module.css";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { CardProduct } from "../Product/cardProduct/cardProduct";
import { allFav } from "../../redux/actions/actions";

const Favorites = () => {
  const userActive = useSelector((state) => state.userLog);

  // const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  //console.log(favorites);

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       const userEmail = user.email;
  //       console.log(userEmail);
  //       setCurrentUser(user);
  //     } else {
  //       setCurrentUser(null);
  //     }
  //   });
  // }, []);
  useEffect(() => {
    if (userActive.email) {
      userActiveFunction()
        .then(() => {
          dispatch(allFav(userActive.email));
        })
        .catch((error) => {
          console.error("Error in userActive:", error);
        });
    }
  }, [userActive.email]);

  const userActiveFunction = () => {
    return new Promise((resolve, reject) => {
      console.log("Favorite", userActive);
      resolve();
    });
  };

  return (
    <div className={styles.favoriteContainer}>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <div className={styles.cartEmpty}>
          <p>You have no added favorites</p>
          <div className={styles.startShoping}>
            <Link to="/home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Add Favorites</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.cards}>
          {favorites?.map((favorite) => (
            <CardProduct key={favorite.id} product={favorite} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
