import React from 'react';

export const CardProduct = ({ id, title, price, image, category }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card" style={{ width: '220px' }}>
        <img className="card-img-top" src={image} alt="product" />
        <div className="card-body">
          title: <h5 className="card-title text-truncate">{title}</h5>
          category: <h5 className="card-title text-truncate">{category}</h5>
          price:<h6 className="card-subtitle mb-2 text-muted">{price}</h6>
        </div>
      </div>
    </div>
  );
};
