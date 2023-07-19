import { NavLink } from "react-router-dom";
import styles from './Landing.module.css';
import logo from '../../assets/logo.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import feature1 from '../../assets/feature 1.png'
import feature2 from '../../assets/feature 2.png'
import feature3 from '../../assets/feature 3.png'

export const Landing = () => {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };


  return (

        <div className={styles.divContainer}>
            <div className={styles.divLeft}>
                <img src={logo} alt="ProdElevate" />
                <h3 className={styles.title}>Online Sales And Administration System</h3>
            </div>
            <div className={styles.divRight}>
                <Slider {...sliderSettings}>
                    <div className={styles.sliderItem}>
                        <img src={feature1} alt="Feature 1" />
                    </div>
                    <div className={styles.sliderItem}>
                        <img src={feature3} alt="Feature 3" />
                    </div>
                    <div className={styles.sliderItem}>
                        <img src={feature2} alt="Feature 2" />
                    </div>
                </Slider>
                <div style={{marginTop: "30px"}}>
            <NavLink to="/home">
                <button className={styles.startButton}> 
                    <span>Let's Start</span>
                </button>
            </NavLink>
                </div>
            </div>

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
      
  );
};
