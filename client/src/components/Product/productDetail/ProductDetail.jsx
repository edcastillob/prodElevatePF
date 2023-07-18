// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getProductDetail } from '../../../redux/actions/actions';
// import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
// import loadingImg from '../../../assets/loading.png'

// export const ProductDetail = () => {
//   const [loading, setLoading] = useState(false);
//   setLoading(true);
//   const params = useParams();
//   const { id } = params;

//   console.log(id);
//   const dispatch = useDispatch();
//   const productDetail = useSelector((state) => state.productDetail);
  
//   useEffect(() => {
//     dispatch(getProductDetail(id)); 
//   }, [dispatch, id]);
  
//   const { image, title, price, description, category } = productDetail;
 
//   setLoading(false);

//   return (
//     <div>
//       <h1>Detail</h1>
//       {loading ? <img src={loadingImg} /> : ''} 
//       <Card>
//         <CardImg top width="100%" src={image} alt="Product Image" className="mx-auto" style={{ maxWidth: '300px' }} />
//         <CardBody>
//           <CardTitle tag="h5">{title}</CardTitle>
//           <CardText>Price: {price}</CardText>
//           <CardText>{description}</CardText>
//           <CardText>Category: {category}</CardText>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../../redux/actions/actions';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import loadingImg from '../../../assets/loading.png'

export const ProductDetail = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  
  useEffect(() => {
    dispatch(getProductDetail(id))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [dispatch, id]);
  
  const { image, title, price, description, category } = productDetail;

  return (
    <div>
      <h1>Detail</h1>
      {loading ? (
        <div>
          <img src={loadingImg} alt="Loading" />         
        </div>
      ) : (
        <Card>
          <CardImg top width="100%" src={image} alt="Product Image" className="mx-auto" style={{ maxWidth: '300px' }} />
          <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
            <CardText>Price: {price}</CardText>
            <CardText>{description}</CardText>
            <CardText>Category: {category}</CardText>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
