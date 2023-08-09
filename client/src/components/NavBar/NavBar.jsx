import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo_2.png";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../users/Firebase/logout.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  getUserEmail,
  logout,
  getRole,
  getUsers,
  getUserSystemLog,
} from "../../redux/actions/actions";
import userImg from "../.././assets/user.png";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import countriesData from "../Country/db.json";
import { useTranslation } from "react-i18next";
import en from "../.././assets/estados-unidos.png";
import es from "../.././assets/espana.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";


export const NavBar = ({
  user,
  userLocal,
  handleSignIn,
  currentLanguage,
  handleLanguageChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { t } = useTranslation("global");

  useEffect(() => {
    dispatch(getRole());
    dispatch(getUsers());
    if (userLocal) {
      dispatch(getUserEmail(userLocal.email));
      dispatch(getUserSystemLog(userLocal.email));
    } else if (user) {
      dispatch(getUserEmail(user.email));
      dispatch(getUserSystemLog(user.email));
    } else {
    }
  }, [user, userLocal, modal]);

  const userMail = useSelector((state) => state.userMail);
  const roles = useSelector((state) => state.role);

  const toggle = () => setModal(!modal);
  //Lógica Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let userLogin = useSelector((state) => state.user);

  const handleLogoutClick = () => {
    if (userLocal) {
      dispatch(logout());
      navigate('/home');
    } else {
      logoutUser();
      navigate('/home');
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
    navigate("/changepass", { state: { userMail } });
  };
  // console.log("userLocal.roleId:", userLocal);

  // Encontrar el objeto de rol que coincide con userLocal.roleId
  const userRole = roles.find((rol) => rol.id === userMail.roleId);
  const userRoleg = roles.find((rol) => rol.id === userMail?.roleId);

  // userLocal ? console.log('UserLocal' ,userLocal) : console.log('Local Vacio');
  // user ? console.log('UserGoogle' ,user) : console.log('Google Vacio');
  // console.log('userData: ', userMail)
  // console.log('roles: ', roles)
  // console.log('rol del user', userRole)

  const [userCountry, setUserCountry] = useState("");
  const [userFlag, setUserFlag] = useState("");
  const usersAll = useSelector((state) => state.users) || [];
  useEffect(() => {
    const country = getUserCountry();
    setUserCountry(country);
    if (country) {
      const countryObject = countriesData.countries.find(
        (countryData) => countryData.name.common === country
      );
      if (countryObject && countryObject.flags) {
        setUserFlag(countryObject.flags);
      } else {
        setUserFlag("");
      }
    }
  }, [userLocal, usersAll]);

  const getUserCountry = () => {
    let usersArray = Array.isArray(usersAll)
      ? usersAll
      : usersAll
      ? [usersAll]
      : [];

    if (userLocal && usersArray.length) {
      const userWithEmail = usersArray.find(
        (user) => user.email === userLocal.email
      );
      if (userWithEmail) {
        return userWithEmail.country;
      }
    } else if (user && usersArray.length) {
      const userWithEmail = usersArray.find(
        (userb) => userb.email === user.email
      );
      if (userWithEmail) {
        return userWithEmail.country;
      }
    }

    return "";
  };
  const userActive = useSelector((state) => state.userLog);

  useEffect(() => {
    if (userActive.isActive === false) {

      swal({
        title: "Inactive User",
        text: `${userActive.name}, your email ${userActive.email}
        is inactive.`,
        icon: "error",
        buttons: "ok",
      }).then((res) => {
        if (res) {
          handleLogoutClick();
        }
      });     
    }
  
  }, [
    userActive.isActive,
    userActive.name,
    userActive.email,
    handleLogoutClick,
  ]);

  // console.log(usersAll)
  // console.log(user.email)

  // console.log('userActive: ', userActive)
  // console.log('rol de user: ', userActive.roleId)
  return (
    <div className={`p-0 m-0 ${styles.navContainer}`}>
      <div className={styles.divLogo}>
        <Link to="/">
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
        {/* LANGUAGE */}
        {currentLanguage === "en" ? (
          <>
            <img
              src={en}
              width={30}
              height={30}
              onClick={() => handleLanguageChange("es")}
              className={styles.language}
            />
          </>
        ) : (
          <>
            <img
              src={es}
              width={30}
              height={30}
              onClick={() => handleLanguageChange("en")}
              className={styles.language}
            />
          </>
        )}

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
                {userActive.roleId !== 10 && (
                  <li>
                    <Link
                      to="/dashboard"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontFamily: "Poppins",
                        textAlign: "start",
                        display: "flex",
                      }}
                    >
                      <h6 style={{ display: "flex", gap: "5px" }}>
                        <ion-icon name="compass"></ion-icon>{" "}
                        {t("navbar.dashboard", { lng: currentLanguage })}
                      </h6>
                    </Link>
                  </li>
                )}

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
                    <ion-icon name="person"></ion-icon>{" "}
                    {t("navbar.profile", { lng: currentLanguage })}
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
                      <ion-icon name="power"></ion-icon>{" "}
                      {t("navbar.logout", { lng: currentLanguage })}
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
                {userActive.roleId !== 10 && (
                  <li>
                    <Link
                      to="/dashboard"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontFamily: "Poppins",
                        textAlign: "start",
                        display: "flex",
                      }}
                    >
                      <h6 style={{ display: "flex", gap: "5px" }}>
                        <ion-icon name="compass"></ion-icon>{" "}
                        {t("navbar.dashboard", { lng: currentLanguage })}
                      </h6>
                    </Link>
                  </li>
                )}

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
                    <ion-icon name="person"></ion-icon>{" "}
                    {t("navbar.profile", { lng: currentLanguage })}
                  </h6>
                </li>

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
                      <ion-icon name="power"></ion-icon>{" "}
                      {t("navbar.logout", { lng: currentLanguage })}
                    </h6>
                  ) : null}
                </li>
              </ul>
            )}
          </div>
        ) : null}

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {userFlag && (
              <img
                src={userFlag.png}
                alt="Flag"
                style={{
                  width: "45px",
                  height: "45px",
                  boxShadow:
                    "box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;",
                }}
              />
            )}
            &nbsp; Profile prodElevate
          </ModalHeader>
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
                <h5>{user.email}</h5>
                <h5>User</h5>
                {userRoleg && <h5>{userRoleg.name}</h5>}
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
                <h5>{userLocal.email}</h5>
                <h5>User</h5>
                {userRole && <h5>{userRole.name}</h5>}
              </>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button className={styles.buttonProfile} onClick={handleChangePass}>
              update profile
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
