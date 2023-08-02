import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo_2.png";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../users/Firebase/logout.js";
import { useDispatch, useSelector } from "react-redux";
import { addFav, getUserEmail, logout } from "../../redux/actions/actions";
import userImg from "../.././assets/user.png";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


export const NavBar = ({ user, userLocal, handleSignIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 useEffect(() => { 
  if (userLocal) {
    dispatch(getUserEmail(userLocal.email)) 
  } else if(user){
    dispatch(getUserEmail(user.email)) 
  } else {

  }

}, [user, userLocal])

const userMail = useSelector((state) => state.userMail);

 
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  //Lógica Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let userLogin = useSelector((state) => state.user);


  const handleLogoutClick = () => {
    if (userLocal) {
      dispatch(logout());
    } else {
      logoutUser();
    }
    window.location.reload(); 
  };

 

  //Handle Dropdown
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChangePass = (event) => {
      event.preventDefault();
      toggle();
      // navigate('/changepass')
      navigate('/changepass', { state: { userMail } });
  }

// userLocal ? console.log('UserLocal' ,userLocal.email) : console.log('Local Vacio');
// user ? console.log('UserGoogle' ,user.email) : console.log('Google Vacio');
// console.log('userData: ', userMail)
  return (
    <div className={`p-0 m-0 ${styles.navContainer}`}>
      <div className={styles.divLogo}>
        <Link to="/home">
          <img className="img-fluid" src={logo} alt="img-logo" />
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }} to="/home">
          <h6 className={styles.homeButton} style={{ fontFamily: "Poppins" }}>
            Home
          </h6>
        </Link>
      </div>
      <div className={styles.divSearch}></div>
      <div className={styles.items}>
        {user || userLocal ? (
          <Link
            className={styles.icon}
            to="/favorites"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h2>
              <ion-icon name="heart"></ion-icon>
            </h2>
          </Link>
        ) : null}

        <Link
          className={styles.icon}
          to="/cart"
          style={{ textDecoration: "none", color: "white" }}
        >
          <h2 className={styles.icon}>
            <ion-icon name="cart"></ion-icon>
          </h2>
        </Link>

        {user || userLocal ? null : (
          <Link
            className={styles.icon}
            to="/login"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h2>
              <ion-icon name="person"></ion-icon>
            </h2>
          </Link>
        )}

        {userLogin &&
          userLogin.user &&
          userLogin.user.image &&
          userLogin.user.image.length > 0 && (
            <img src={userLogin.user.image[0]} alt="User Avatar" />
          )}

        {userLocal ? (
          <div
            className={` ${styles.userInfo} ${styles.userContainer}`}
            onClick={handleDropdownToggle}
          >
            <p className={styles.name}>{userLocal.name}</p>
            <img
              src={userLocal.image}
              alt={userLocal.name}
              className={styles.avatar}
            />

            {/* Dropdown de opciones */}
            {isDropdownOpen && (
              <ul className={styles.dropdownOptions} style={{ zIndex: 10 }}>
                <li>
                <Link
                    to="/dashboard"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                      display:'flex'
                    }}
                  >
                    <h6 style={{display:'flex', gap:'5px'}}>
                      <ion-icon name="compass"></ion-icon> Dashboard
                    </h6>
                  </Link>
                </li>

                <li>
                  <h6
                    style={{
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                      cursor: "pointer", 
                    }}
                    onClick={toggle} 
                  >
                    <ion-icon name="person"></ion-icon> Profile
                  </h6>
                </li>

                <li>
                  {userLocal ? (
                    <h6
                      style={{
                        color: "black",
                        fontFamily: "Poppins",
                        textAlign: "start",
                      }}
                      onClick={handleLogoutClick}
                    >
                      <ion-icon name="power"></ion-icon> Logout
                    </h6>
                  ) : null}
                </li>
              </ul>
            )}
          </div>
        ) : null}
        {/* //--------------------------------------------Google ---------------------------------- */}
        {user ? (
          <div
            className={` ${styles.userInfo} ${styles.userContainer}`}
            onClick={handleDropdownToggle}
          >
            <p className={styles.name}>{user.displayName}</p>
            <img
              src={user.photoURL}
              alt={user.displayName}
              className={styles.avatar}
            />

            {/* Dropdown de opciones */}
            {isDropdownOpen && (
              <ul className={styles.dropdownOptions} style={{ zIndex: 10 }}>
                <li>
                  <Link
                    className={styles.icon}
                    to="/dashboard"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                    }}
                  >
                    <h6>
                      <ion-icon name="compass"></ion-icon> Dashboard
                    </h6>
                  </Link>
                </li>

                
                <li>
                  <h6
                    style={{
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                      cursor: "pointer", 
                    }}
                    onClick={toggle} 
                  >
                    <ion-icon name="person"></ion-icon> Profile
                  </h6>
                </li> 
                
                {/* <li>
                  <Link
                    className={styles.icon}
                    to="/settings"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                    }}
                  >
                    <h6>
                      <ion-icon name="settings"></ion-icon> Settings
                    </h6>
                  </Link>
                </li> */}

                <li>
                  {user ? (
                    <h6
                      style={{
                        color: "black",
                        fontFamily: "Poppins",
                        textAlign: "start",
                      }}
                      onClick={handleLogoutClick}
                    >
                      <ion-icon name="power"></ion-icon> Logout
                    </h6>
                  ) : null}
                </li>
              </ul>
            )}
          </div>
        ) : null}

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>user prodElevate</ModalHeader>
          <ModalBody>
            {user ? (
              <>
                <h3>{user.displayName}</h3>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className={styles.avatarProfile}
                />
                <br />
                <br />
                <h6>{user.email}</h6>
              </>
            ) : null}

            {userLocal ? (
              <>
                <h3>{userLocal.name}</h3>
                <img
                  src={userLocal.image}
                  alt={userLocal.name}
                  className={styles.avatarProfile}
                />
                <br />
                <br />
                <h6>{userLocal.email}</h6>
              </>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button className={styles.buttonProfile} onClick={handleChangePass}>
              update profile
            </Button>{" "}
            <Button className={styles.buttonProfile} onClick={toggle}>
              ok
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
