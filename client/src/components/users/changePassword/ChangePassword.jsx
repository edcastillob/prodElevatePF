import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadImg } from "../../Product/uploadImg/UploadImg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import styles from "./ChangePassword.module.css";
import validate from "./validationEditUser";
import ReactQuill from "react-quill";
// import loadingImg from "../../../assets/loading.png";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUserId } from "../../../redux/actions/actions";
import countriesData from "../../Country/db.json";



export const  ChangePassword = () => {
  useEffect(() => {   
    toast.info("¡to update confirm or change your password!");
  }, [])
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userMail = location.state.userMail;
  
  const params = useParams();
  const { id } = params;
  useEffect(() => {   
      dispatch(getUserId(userMail.id));   
  }, [dispatch, id]);
  
  const userActive = useSelector((state) => state.users);
  // console.log('userActive', userActive)
  
  
  const [selectedCountry, setSelectedCountry] = useState("");
  const [imageDeleted, setImageDeleted] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const [changeUser, setChangeUser] = useState({
    name: userMail.name,
    identification: userMail.identification,  
    numPhone:  userMail.numPhone, 
    country: userMail.country ,  
    password: userMail.password,
    confirmpassword: "______",
    image: userMail.image,    
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (
      userMail.name &&
      userMail.identification &&
      userMail.numPhone &&
      userMail.country &&
      userMail.password &&
      userMail.image
    ) {
      setChangeUser({
        name: userMail.name,
        identification: userMail.identification,
        numPhone: userMail.numPhone,
        country: userMail.country,
        password: userMail.password,
        image: userMail.image,
      });
    }
  }, [
    userMail.name,
    userMail.identification,
    userMail.numPhone,
    userMail.country,
    userMail.password,
    userMail.image,
  ]);

  const handleChange = (event) => {
    event.preventDefault();
    setChangeUser({
      ...changeUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleRemoveImage = () => {
    setChangeUser((changeUser) => ({
      ...changeUser,
      image: [],
    }));
    setImageDeleted(true);
  };

  const handleImageUpload = (imageUrls) => {
    // console.log(".....",imageUrls)
    // Convertir la URL en un array si es un string
    const urlsArray = typeof imageUrls !== 'Array' ? [imageUrls] : imageUrls;
  
    setChangeUser((imgProduct) => ({
      ...imgProduct,
      image: urlsArray,
    }));
  };
  
  
  

  const handleSubmit = (event) => {
  event.preventDefault();
  const errors = validate(changeUser);
  setErrors(errors);
  if (changeUser.password !== changeUser.confirmpassword) {
    toast.error("Passwords do not match!");
    toast.info("To update confirm or change your password!");
    return;
  }
  if (Object.keys(errors).length === 0) {
    dispatch(editUser(userMail.id, changeUser));
    toast.success("Edit user successfully!");
    setErrors({});
    navigate("/home");
  } else {
    toast.error("All fields must be filled Correctly")
  }
  };

  const compareCountries = (a, b) => {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  };

  const sortedCountries = countriesData.countries.sort(compareCountries);

  const handleCountrySelect = (event) => { 
    event.preventDefault();
    const countryValue = event.target.value; 
    setSelectedCountry(countryValue);
    setChangeUser((changeUser) => ({
      ...changeUser,
      country: countryValue,
    }));
  }
  // console.log("_z_",userMail.country)

  
  return(
    <div className={styles.container}>

    <form  onSubmit={handleSubmit} className={styles.formContainer}>
    <h4 style={{ fontFamily: "Poppins" }}>Edit User</h4>
      {/* _____________NAME________________ */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Fullname"
          className={`form-control mb-3 w-75`}
          onChange={handleChange}
          value={changeUser.name}
        />       
        {errors.name && (
          <p className={styles.error}>{errors.name}</p>
        )}
       
      
      {/* _____________ID________________ */}
        <label>Identification:</label>
        <input
          type="text"
          name="identification"
          placeholder="Document ID"
          className={`form-control mb-3 w-75 `}
          onChange={handleChange}
          value={changeUser.identification}
        />
        {errors.identification && (
          <p className={styles.error}>{errors.identification}</p>
        )}
    
      {/* _____________PHONE NUMBER________________ */}
        <label>Phone:</label>
        <input
          type="text"
          name="numPhone"
          placeholder="Phone N°"
          className={`form-control mb-3 w-75 `}
          onChange={handleChange}
          value={changeUser.numPhone}
        />
        {errors.numPhone && (
          <p className={styles.error}>{errors.numPhone}</p>
        )} 
                   {/* _____________country________________ */}
                   <div >
                <select
                  className={`form-control mb-3 w-75 ${styles.input} ${styles.select}`}
                  name="country"
                  onChange={handleCountrySelect}
                  defaultValue={userMail.country}
                >
                  <option value="">Select a country</option>
                  {sortedCountries.map((country) => (
                    <option key={country.cca3} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
              </div>
              {/*errors.country && (
                <p className={styles.error}>{errors.country}</p>
              )*/}
      {/* _____________password________________ */}
      <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className={`form-control mb-3 w-75 `}
          onChange={handleChange}
          value={changeUser.password}
        />

      {/* _____________password________________ */}
      <label>Confirm password:</label>
        <input
          type="password"
          name="confirmpassword"
          placeholder="password"
          className={`form-control mb-3 w-75 `}
          onChange={handleChange}
          value={changeUser.confirmpassword}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      
      <br />

      {/* _____________image________________ */}
      <div className="d-flex align-items-center">
          <div className={styles.imgForm}>
            <label>Image:</label>
            {changeUser.image && !imageDeleted ? (
              <div>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={handleRemoveImage}
                >
                  X
                </button>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                >
                  <img
                    src={changeUser.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                {/*<h6
                  style={{
                    fontFamily: "Poppins",
                    textAlign: "start",
                    marginTop: "-1rem",
                  }}
                >
                  Image:
                </h6>*/}
                <UploadImg
                  onImageUpload={handleImageUpload}
                  uploadedImages={changeUser.image}
                  clearUploadedImages={() =>
                    setChangeUser((users) => ({
                      ...users,
                      image: [],
                    }))
                  }
                />
              </div>
            )}
          </div>
        </div>
        {errors.image && (
          <p className={styles.error}>{errors.image}</p>
        )}        

        <br />
        <br />

        <button type="submit" className={styles.create}>
          Update User
        </button>
      </form>
    </div>
  );
};