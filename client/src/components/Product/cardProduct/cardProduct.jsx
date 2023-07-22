import { NavLink } from "react-router-dom";

export const CardProduct = ({ id, name, category, image, salePrice }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card" style={{ width: "220px" }}>
        {/* <NavLink title="Detail Country" to={`/detail/20`}>           */}
        <NavLink title="Detail Product" to={`/productid/${id}`}>
          <img className="card-img-top" src={image} alt="product" />
        </NavLink>

        <div className="card-body">
          <h5 className="card-title text-truncate">{name}</h5>
          <h5 className="card-title text-truncate">{category}</h5>
          Price<h6 className="card-subtitle mb-2 text-muted">{salePrice}</h6>
        </div>
      </div>
    </div>
  );
};
