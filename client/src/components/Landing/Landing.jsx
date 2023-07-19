import { NavLink } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1 className="display-4">Welcome to Our Website</h1>
          <p className="lead">
            prodElevate will be a product administration and management system
            for online sales. The main goal is to provide users with a platform
            where they can create, manage and sell products efficiently. The
            system will have functionalities such as authentication and
            authorization, creation of products, categories, shopping cart,
            payment gateway, administration dashboard and notifications.
          </p>
          <NavLink to="/home" className="btn btn-primary">
            Get Started
          </NavLink>
        </div>
      </div>
    </div>
  );
};
