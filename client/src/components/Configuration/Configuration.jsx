import React, { useRef, useState } from "react";
import styles from "./Configuration.module.css";
// import config from "../../assets/config_logo.png";
// import { Link } from "react-router-dom";
import { Provider } from "../Product/provider/Provider";
import { Category } from "../Product/category/Category";
import { Product } from "../Product/createProduct/Product";

import logo from "../../assets/logo_2.png";
import { MdMenu } from "react-icons/md";
import { Role } from "../users/role/Role";

export const Configuration = ({ toggleActive }) => {
  // Dropdown states
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Component selection states
  const [selectedProviderComponent, setSelectedProviderComponent] =
    useState(null);
  const [selectedProductComponent, setSelectedProductComponent] =
    useState(null);
  const [selectedCategoryComponent, setSelectedCategoryComponent] =
    useState(null);
  const [selectedRoleComponent, setSelectedRoleComponent] =
    useState(null);
  const [selectedUserComponent, setSelectedUserComponent] = useState(null);

  const [componentSelected, setComponentSelected] = useState(false);

  // Refs for dropdown containers
  const providerDropdownRef = useRef(null);
  const productDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const roleDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Handle Provider option click
  const handleProviderOptionClick = (component) => {
    setSelectedProviderComponent(component);
    setIsProviderDropdownOpen(false);
    setComponentSelected(true);

    // Resetear el estado de las otras opciones seleccionadas
    setSelectedProductComponent(null);
    setSelectedCategoryComponent(null);
    setSelectedRoleComponent(null);
    setSelectedUserComponent(null);
  };

  // Handle Product option click
  const handleProductOptionClick = (component) => {
    setSelectedProductComponent(component);
    setIsProductDropdownOpen(false);
    setIsRoleDropdownOpen(false);
    setComponentSelected(true);

    // Resetear el estado de las otras opciones seleccionadas
    setSelectedProviderComponent(null);
    setSelectedCategoryComponent(null);
    setSelectedRoleComponent(null);
    setSelectedUserComponent(null);
  };

  // Handle Category option click
  const handleCategoryOptionClick = (component) => {
    setSelectedCategoryComponent(component);
    setIsCategoryDropdownOpen(false);
    setIsRoleDropdownOpen(false);
    setComponentSelected(true);

    // Resetear el estado de las otras opciones seleccionadas
    setSelectedProviderComponent(null);
    setSelectedProductComponent(null);
    setSelectedRoleComponent(null);
    setSelectedUserComponent(null);
  };

  // Handle User option click
  const handleUserOptionClick = (component) => {
    setSelectedUserComponent(component);
    setIsUserDropdownOpen(false);
    setIsRoleDropdownOpen(false);
    setComponentSelected(true);

    // Resetear el estado de las otras opciones seleccionadas
    setSelectedProviderComponent(null);
    setSelectedProductComponent(null);
    setSelectedCategoryComponent(null);
    setSelectedRoleComponent(null);
  };
  // Handle User option click
  const handleRoleOptionClick = (component) => {
    setSelectedRoleComponent(component);
    setIsUserDropdownOpen(false);
    setIsUserDropdownOpen(false);
    setComponentSelected(true);

    // Resetear el estado de las otras opciones seleccionadas
    setSelectedProviderComponent(null);
    setSelectedProductComponent(null);
    setSelectedCategoryComponent(null);
    setSelectedUserComponent(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggle} onClick={toggleActive}>
          <MdMenu />
        </div>
      <div className={styles.title}>

        <div className={styles.sidebar}>
          {/* PRODUCT */}
          <div className={styles.optionContainer}>
            <div
              className={styles.options}
              onClick={() => handleProductOptionClick("Create Product")}
            >
              <span style={{ fontSize: "2.4rem", marginRight: "0.5rem" }}>
                <ion-icon name="basket"></ion-icon>
              </span>
              Create Product
            </div>
          </div>

          {/* PROVIDER */}
          <div className={styles.optionContainer}>
            <div
              className={styles.options}
              onClick={() => handleProviderOptionClick("Create Provider")}
            >
              <span style={{ fontSize: "2.4rem", marginRight: "0.5rem" }}>
                <ion-icon name="contacts"></ion-icon>
              </span>
              Create Provider
            </div>
          </div>

          {/* CATEGORY */}
          <div className={styles.optionContainer}>
            <div
              className={styles.options}
              onClick={() => handleCategoryOptionClick("Create Category")}
            >
              <span style={{ fontSize: "2.4rem", marginRight: "0.5rem" }}>
                <ion-icon name="apps"></ion-icon>
              </span>
              Create Category
            </div>
          </div>

                    {/* Role */}
                    <div className={styles.optionContainer}>
            <div
              className={styles.options}
              onClick={() => handleRoleOptionClick("Create Role")}
            >
              <span style={{ fontSize: "2.4rem", marginRight: "0.5rem" }}>
                <ion-icon name="contact"></ion-icon>
              </span>
              Create Role
            </div>
          </div>
          {/* USER */}
          {/* <div className={styles.optionContainer}>
            <div
              className={styles.options}
              onClick={() => handleUserOptionClick("User")}
            >
              <span style={{ fontSize: "2.4rem", marginRight: "0.5rem" }}>
                <ion-icon name="contact"></ion-icon>
              </span>
              Create User
            </div>
            <div
              className={styles.dropdownOption}
              onClick={() => handleUserOptionClick("Create User")}
            >
              <ion-icon name="add"></ion-icon>Create User
            </div>
          </div> */}
        </div>


      </div>
      
        

        <div className={styles.components}>
          {componentSelected ? (
            <>
              {/* PRODUCT COMPONENTS */}
              {selectedProductComponent === "Create Product" && <Product />}

              {/* PROVIDER COMPONENTS */}
              {selectedProviderComponent === "Create Provider" && <Provider />}

              {/* CATEGORY COMPONENTS */}
              {selectedCategoryComponent === "Create Category" && <Category />}

              {/* ROLE COMPONENTS */}
              {selectedRoleComponent === "Create Role" && <Role />}

              {/* USER COMPONENTS */}
              {/* {selectedUserComponent === "Create User" && <CreateUser />} */}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <img src={logo} alt="ProdElevate" />
              <h3
                style={{
                  fontFamily: "Poppins",
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                ONLINE SALES AND ADMINISTRATION SYSTEM
              </h3>
            </div>
          )}
        </div>
      </div>
  );
};
