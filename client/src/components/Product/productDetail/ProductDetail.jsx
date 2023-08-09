import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addComment,
  getProductDetail,
  getUsers,
  showReviewsId,
} from "../../../redux/actions/actions";
import loadingImg from "../../../assets/loading.png";
import { getCategory } from "../../../redux/actions/actions";
import styles from "./ProductDetail.module.css";
import { useTranslation } from "react-i18next";
import { addToCart } from "../../../redux/actions/actions";
import { Link } from "react-router-dom";
// import { addToCart } from "../../../redux/actions/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as farStar,
  faStar as fasStar,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ProductDetail = ({ currentLanguage }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const { t } = useTranslation('global');
  const handleStarClick = (starIndex) => {
    setSelectedStars(starIndex + 1);
  };
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [review, setReview] = useState({
    score: "",
    comment: "",
    date: "",
    email: "",
    isActive: "",
    productId: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getUsers());
    dispatch(showReviewsId(id));
  }, []);

  const commentary = useSelector((state) => state.reviews);
  const productDetail = useSelector((state) => state.productDetail);
  const selectedCategory = useSelector((state) => state.category);
  const userActive = useSelector((state) => state.userLog);
  const userAll = useSelector((state) => state.users);

  useEffect(() => {
    Promise.all([dispatch(getProductDetail(id))])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [dispatch, id]);

  const { images, categoryId, salePrice, description, name } = productDetail;

  const handledAddToCart = (product) => {
    dispatch(addToCart(productDetail));
    navigate("/cart");
  };

  const category =
    selectedCategory.find((cat) => cat.id === categoryId)?.name ||
    "Unknown Category";

  useEffect(() => {
    setReview({
      score: selectedStars,
      comment: comment,
      date: new Date(),
      email: userActive.email,
      isActive: true,
      productId: id,
    });
  }, [selectedStars, comment]);

  const handledAddComment = (event) => {
    setReview({
      productId: id,
      score: selectedStars,
      comment,
      date: new Date(),
      email: userActive.email,
      isActive: true,
    });
    dispatch(addComment(review));
    setSelectedStars(0);
    setComment("");
    setShowModal(false);
    window.location.reload();
  };
  // console.log('comment: ', comment)
  // console.log('review :', review)
  // console.log(commentary);
  const totalScore = commentary.reduce(
    (total, comment) => total + comment.score,
    0
  );
  const averageScore = Math.round(totalScore / commentary.length);
  // console.log("userActive", userActive);

  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  

  return (
    <div style={{ padding: "1rem" }}>
      {loading ? (
        <div>
          <img src={loadingImg} alt="Loading" />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.back}>
            <Link to="/home">
              <div className={styles.backButton}>
                <p>
                  <ion-icon name="arrow-round-back"></ion-icon>
                  <ion-icon name="home"></ion-icon>
                </p>
              </div>
            </Link>
          </div>
          <div className={styles.divImg}>
            <img src={images} alt={name} />
          </div>

          <div className={styles.description}>
            {/* promedio con estrellas */}
            <div className={styles.starContainer}>
              {[0, 1, 2, 3, 4].map((index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={index < averageScore ? solidStar : farStar}
                  className={styles.star}
                />
              ))}
            </div>
            <br />

            <div className={styles.divName}>
              <h4 style={{ fontFamily: "Poppins" }}>{name}</h4>


            </div>
            <div
              className={styles.descriptionItem}
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <h6>{t("product-detail.category", { lng: currentLanguage })} {category} </h6>

            <h4>{t("product-detail.price", { lng: currentLanguage })} ${salePrice} </h4>

            

            <div className={styles.divBtn}>
              <button
                className={styles.buttonCart}
                onClick={() => handledAddToCart(productDetail)}
              >
                {t("product-detail.add-to-cart", { lng: currentLanguage })}
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalHeader>
          <div className={styles.headerContent}>
            <img
              src={userActive.image}
              alt="User Avatar"
              className={styles.avatar}
            />
            <span className={styles.commentHeader}>{t("product-detail.comment", { lng: currentLanguage })}</span>
          </div>
          <br />
          <div className={styles.starContainer}>
            {[0, 1, 2, 3, 4].map((index) => (
              <FontAwesomeIcon
                key={index}
                icon={index < selectedStars ? solidStar : farStar}
                className={styles.star}
                onClick={() => handleStarClick(index)}
              />
            ))}
          </div>
        </ModalHeader>
        <ModalBody>
          <input
            className={styles.commentInput}
            type="text"
            placeholder={t("product-detail.add-your-comment", { lng: currentLanguage })}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className={styles.cancel}
            onClick={() => setShowModal(false)}
          >
            {t("product-detail.cancel", { lng: currentLanguage })}
          </Button>
          <Button
            className={styles.addBtn}
            onClick={() => handledAddComment()}
          >
           {t("product-detail.save", { lng: currentLanguage })}
          </Button>
        </ModalFooter>
      </Modal>
      <h4>{t("product-detail.last-reviews", { lng: currentLanguage })}</h4>
      <div className={styles.reviewsContainer}>
      
      <Slider {...sliderSettings} className={styles.sliderContainer}>
        {commentary
          .slice()
          .reverse()
          .map((comment) => {
            const user = userAll.find((user) => user.email === comment.email);

            return (
              <div key={comment.id} className={styles.card}>
                <div className={styles.divInfo}>
              {user && user.image && (
                <img
                  src={user.image[0]}
                  alt="User Avatar"
                  className={styles.avatar}
                />
              )}
              <span className={styles.userName}>{user && user.name}</span>
            </div>
            <div className={styles.divStars}>
              {[0, 1, 2, 3, 4].map((index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={index < comment.score ? solidStar : farStar}
                  className={styles.star}
                />
              ))}
            </div>
            <div className={styles.divComment}>{comment.comment}</div>
          
              </div>
            );
          })}
      </Slider>       

      </div>
      <div className={styles.addReview}>      
          <button
              className={styles.buttonCart}
              onClick={() => {
                if (userActive.email) {
                  setShowModal(true);
                } else {
                  navigate("/login");
                }
              }}
            >
              {t("product-detail.add", { lng: currentLanguage })}
            </button>
            </div>
      


    </div>
    
    
  );
};
