import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "../../Reviews/ReviewCard"; // Asegúrate de proporcionar la ruta correcta hacia el componente ReviewCard
import styles from "../Dashboard.module.css"; // Importa los estilos específicos para este componente si los tienes
import { MdSearch, MdMenu } from "react-icons/md";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Reviews2 = ({ toggleActive }) => {
  const [searchReviews, setSearchReviews] = useState("");
  const reviews = useSelector((state) => state.reviews);
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    dispatch(getProductDetail(id)) // Cargar los detalles del producto
      .then(() => {
        // Después de cargar los detalles, cargar las reseñas del producto
        dispatch(getProductReviews(id));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, [dispatch, id]);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  
  // Filtrar las reviews por el texto de búsqueda
  const filteredReviews = reviews.filter((review) =>
    review.text.toLowerCase().includes(searchReviews.toLowerCase())
  );

  return (
    <div>
      {/* TOPBAR */}
      <div className={styles.topbar}>
        <div className={styles.toggle} onClick={toggleActive}>
          <MdMenu />
        </div>
      </div>

      <div className={styles.customers}>
        <div className={styles.wrapper}>
          <div className={styles.customersHeader}>
            <h2 style={{ fontFamily: "Poppins" }}>Reviews</h2>
          </div>

          <input
            type="text"
            className="form-control w-25 h-50"
            placeholder="Search review"
            value={searchReviews}
            onChange={(event) => setSearchReviews(event.target.value)}
          />

          <div className={styles.productContainer}>
            {filteredReviews.length === 0 ? (
              <div>No reviews found.</div>
            ) : (
              filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} user={currentUser} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews2;
