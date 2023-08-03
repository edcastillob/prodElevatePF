import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadImg } from "../../Product/uploadImg/UploadImg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import styles from "./ChangePassword.module.css";
import ReactQuill from "react-quill";
// import loadingImg from "../../../assets/loading.png";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUserId } from "../../../redux/actions/actions";

export const  ChangePassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userMail = location.state.userMail;
  

  const [passwordError, setPasswordError] = useState("");

  const [changeUser, setChangeUser] = useState({
    name: "",
    identification: "",  
    numPhone: "",   
    password: "",
    confirmpassword: "",
    image: [],    
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (
      userMail.name &&
      userMail.identification &&
      userMail.numPhone &&
      userMail.password &&
      userMail.image
    ) {
      setChangeUser({
        name: userMail.name,
        identification: userMail.identification,
        numPhone: userMail.numPhone,
        password: userMail.password,
        image: userMail.image,
      });
    }
  }, [
    userMail.name,
    userMail.identification,
    userMail.numPhone,
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
    setChangeUser((users) => ({
      ...users,
      image: "",
    }));
  };

  const handleImageUpload = (imageUrls) => {
    setChangeUser((imgProduct) => ({
      ...imgProduct,
      image: [...(imgProduct.image || []), ...imageUrls],
    }));
  };

  const handleSubmit = (event) => {
  event.preventDefault();
  if (changeUser.password !== changeUser.confirmpassword) {
    setPasswordError("Passwords do not match");
    return;
  }
    dispatch(editUser(userMail.id, changeUser));
    toast.success("¡Edit user successfully!");
    navigate("/home");
  };
  console.log(changeUser)
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

      <div className="d-flex align-items-center">
        <div>
          {changeUser.image ? (
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
              <h6
                style={{
                  fontFamily: "Poppins",
                  textAlign: "start",
                  marginTop: "-1rem",
                }}
              >
                Image:
              </h6>
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

      <br />
      <br />

      <button type="submit" className={styles.create}>
        Update User
      </button>
    </form>
  </div>
);
};