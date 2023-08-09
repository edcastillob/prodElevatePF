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

export const ProductDetail = () => {
  const [selectedStars, setSelectedStars] = useState(0);

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
            <h4 style={{ fontFamily: "Poppins" }}>{name}</h4>
            <div
              className={styles.descriptionItem}
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <h6>Category: {category} </h6>

            <h4>Price ${salePrice} </h4>

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
              Add Comment
            </button>

            <button
              className={styles.buttonCart}
              onClick={() => handledAddToCart(productDetail)}
            >
              Add to Cart
            </button>
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
            <span className={styles.commentHeader}>- Comment</span>
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
            placeholder="Add your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className={styles.buttonCart}
            onClick={() => handledAddComment()}
          >
            Save
          </Button>
          <Button
            className={styles.buttonCart2}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div className={styles.reviewsTable}></div>
      {commentary && commentary.length > 0 && (
        <div className={styles.reviewsTable}>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>User</th>
                <th>Stars</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody className="table table-borderless">
              {commentary
                .slice()
                .reverse()
                .map((comment) => {
                  // console.log("Comment ID:", comment.id);
                  const user = userAll.find(
                    (user) => user.email === comment.email
                  );

                  return (
                    <tr key={comment.id}>
                      <td>
                        {user && user.image && (
                          <img
                            src={user.image[0]}
                            alt="User Avatar"
                            className={styles.avatar}
                          />
                        )}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {[0, 1, 2, 3, 4].map((index) => (
                          <FontAwesomeIcon
                            key={index}
                            icon={index < comment.score ? solidStar : farStar}
                            className={styles.star}
                          />
                        ))}
                      </td>
                      <td>{comment.comment}</td>
                      <td>{comment.date}</td>
                      <td>{comment.email}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
