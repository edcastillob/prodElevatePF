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
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,

      };


  return (
        <div className={styles.divContainer}>
            <div className={styles.divLeft}>
                <img src={logo} alt="ProdElevate" />
                <h3 className={styles.title}>Online Sales And Administration System</h3>
            </div>
            <div className={styles.divRight}>
            <div className={styles.sliderContainer}>
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
                </div>    
                <div className={styles.divButton}>
            <NavLink to="/home">
                <button className={styles.startButton}> 
                    <span>Let's Start</span>
                </button>
            </NavLink>
                </div>
            </div>

        </div>
  )
}


