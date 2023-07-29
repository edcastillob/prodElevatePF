import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import logo from "../../assets/logo_2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import adidas from "../../assets/adidas.png";
import puma from "../../assets/puma.png";
import apple from "../../assets/apple.png";
import samsung from "../../assets/samsung.png";

export const Landing = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3, // Número de imágenes a mostrar por slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const companyLogos = [adidas, puma, apple, samsung];

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo} alt="ProdElevate" />
        </div>
        <div className={styles.options}>
          <p className={styles.language}>Language</p>
          <Link to="/usuario" className={styles.signUp}>
            <p>Sign Up</p>
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.divLeft}>
          <h1 className={styles.title}>Welcome to ProdElevate</h1>
          <h4 style={{ color: "#cacaca", fontFamily: "Poppins" }}>
            It's time to...
          </h4>
          <div className={styles.item}>
            {/* <img src={check} alt="check" /> */}
            <span style={{ color: "white" }}>&#8680;</span>
            <p className={styles.description}>
              Take full control of your business
            </p>
          </div>
          <div className={styles.item}>
            {/* <img src={check} alt="check" /> */}
            <span style={{ color: "white" }}>&#8680;</span>
            <p className={styles.description}>
              Control and manage your finances and inventory
            </p>
          </div>
          <div className={styles.item}>
            {/* <img src={check} alt="check" /> */}
            <span style={{ color: "white" }}>&#8680;</span>
            <p className={styles.description} style={{ marginTop: "1rem" }}>
              Increase your sales and accelerate your business growth with our
              powerful management tool
            </p>
          </div>
          <Link to="/home" className={styles.button}>
            <div>
              <span>Get Started</span>
            </div>
          </Link>
        </div>
        <div className={styles.reel}>
          <h4 className={styles.titleReel}>This companies trust us</h4>
          <div className={styles.companies}>
            <Slider {...carouselSettings}>
              {companyLogos.map((logo, index) => (
                <div className={styles.companie} key={index}>
                  <img src={logo} alt={`Company Logo ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
