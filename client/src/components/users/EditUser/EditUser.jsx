import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadImg } from "../../Product/uploadImg/UploadImg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import styles from "./EditUser.module.css";
import ReactQuill from "react-quill";
// import loadingImg from "../../../assets/loading.png";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getRole, getUserId } from "../../../redux/actions/actions";
import { useTranslation } from 'react-i18next';
import validate from "./validation";

export const EditUser = ({ currentLanguage }) => {
  const { t } = useTranslation('global');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    dispatch(getUserId(id));
    dispatch(getRole());
  }, [dispatch, id]);
  const users = useSelector((state) => state.users);
  const roles = useSelector((state) => state.role);
  if (users && !users.isActive) {
    users.isActive = "f";
  }

  const [changeUser, setChangeUser] = useState({
    name: users.name,
    email: users.email,
    isActive: "",
    roleId: "",
    // identification: "",
    // numPhone: "",
    // address: "",
    // password: "",
    // image: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (
      users.name &&
      users.email &&
      users.isActive &&
      users.roleId 
      // users.identification &&
      // users.numPhone &&
      // users.address &&
      // users.password &&
      // users.image
    ) {
      setChangeUser({
        isActive: users.isActive,
        roleId: users.roleId,
        name: users.name,
        email: users.email,
        // identification: users.identification,
        // numPhone: users.numPhone,
        // address: users.address,
        // password: users.password,
        // image: users.image,
      });
    }
  }, [
    users.name,
    users.email,
    users.roleId,
    users.isActive,
    // users.identification,
    // users.numPhone,
    // users.address,
    // users.password,
    // users.image,
  ]);

  const handleChange = (event) => {
    event.preventDefault();
    setChangeUser({
      ...changeUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate(changeUser);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(editUser(id, changeUser));
      toast.success(t("edit-user.successfully", { lng: currentLanguage }));
      setErrors({});
      navigate("/dashboard");
    } else {
      toast.error("All fields must be filled Correctly");
    }
    // console.log("Datos enviados: ", changeUser);
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
  console.log("el usuario: ",users)
  console.log("el change: ",changeUser)
  // console.log("el rol: ",roles)
  console.log(users)
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.divTitle}>
        <h4 style={{ fontFamily: "Poppins" }}>{t("edit-user.edit-user", { lng: currentLanguage })}</h4>
        </div>
        {/* _____________Status________________ */}
        <label>{t("edit-user.status", { lng: currentLanguage })}</label>
        <select
          className="form-control mb-3 w-100"
          name="isActive"
          value={changeUser.isActive}
          defaultValue={users.isActive}
          onChange={handleChange}
        >
          <option value="t">{t("edit-user.active", { lng: currentLanguage })}</option>
          <option value="f">{t("edit-user.inactive", { lng: currentLanguage })}</option>
        </select>

        {/* _____________Role________________ */}
        <label>{t("edit-user.role", { lng: currentLanguage })}</label>
        <select
          className="form-control mb-3 w-100"
          name="roleId"
          value={changeUser.roleId} // Usamos directamente el roleId del estado local
          onChange={handleChange}
          aria-readonly
        >
          {roles.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.name}
            </option>
          ))}
        </select>

        {/* _____________NAME________________ */}
        <label>{t("edit-user.name", { lng: currentLanguage })}</label>
        <input
          type="text"
          name="name"
          placeholder={t("edit-user.fullname", { lng: currentLanguage })}
          className={`form-control mb-3 w-100 ${errors.name && "is-invalid"}`}
          onChange={handleChange}
          value={changeUser.name}
        />
        {errors.name && (
          <p className={styles.error}>{errors.name}</p>
        )}

        {/* _____________EMAIL________________ */}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`form-control mb-3 w-100 ${errors.email && "is-invalid"}`}
          onChange={handleChange}
          value={changeUser.email}
        />
        {errors.email && (
          <p className={styles.error}>{errors.email}</p>
        )}
        {/* Estado del usuario */}

        {/* _____________ID________________ */}
        {/* <label>Identification:</label>
        <input
          type="text"
          name="identification"
          placeholder="Document ID"
          className={`form-control mb-3 w-75 ${
            errors.identification && "is-invalid"
          }`}
          onChange={handleChange}
          value={changeUser.identification}
        /> */}
        {/* {errors.identification && (
            <div className="invalid-feedback">{errors.identification}</div>
          )} */}

        {/* _____________PHONE NUMBER________________ */}
        {/* <label>Phone:</label>
        <input
          type="text"
          name="numPhone"
          placeholder="Phone N°"
          className={`form-control mb-3 w-75 ${
            errors.numPhone && "is-invalid"
          }`}
          onChange={handleChange}
          value={changeUser.numPhone}
        /> */}
        {/* {errors.numPhone && (
            <div className="invalid-feedback">{errors.numPhone}</div>
          )} */}

        {/* _____________ADDRESS________________ */}
        {/* <label>Address:</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          className={`form-control mb-3 w-75 ${errors.address && "is-invalid"}`}
          onChange={handleChange}
          value={changeUser.address}
        /> */}
        {/* {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )} */}

        <br />

        {/* <div className="d-flex align-items-center">
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
        <br /> */}
        <div className={styles.divBtn}>
        <button type="submit" className={styles.create}>
          {t("edit-user.update", { lng: currentLanguage })}
        </button>
        </div>
      </form>
    </div>
  );
};
