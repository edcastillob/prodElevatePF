import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail, getCategory } from "../../../redux/actions/actions";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import loadingImg from "../../../assets/loading.png";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const productDetail = useSelector((state) => state.productDetail);
  const selectedCategory = useSelector((state) => state.category);

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
  console.log(selectedCategory);
  console.log(productDetail);
  // Buscar la categoría correspondiente al categoryId
  const category =
    selectedCategory.find((cat) => cat.id === categoryId)?.name ||
    "Unknown Category";

  return (
    <div>
      <h1>Detail</h1>
      {loading ? (
        <div>
          <img src={loadingImg} alt="Loading" />
        </div>
      ) : (
        <Card>
          <CardImg
            top
            width="100%"
            src={images}
            alt="Product Image"
            className="mx-auto"
            style={{ maxWidth: "300px" }}
          />
          <CardBody>
            <CardText> {name}</CardText>
            <CardTitle tag="h5">{description}</CardTitle>
            <CardText>Price: {salePrice}</CardText>
            <CardText>{description}</CardText>
            <CardText>{category}</CardText>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
