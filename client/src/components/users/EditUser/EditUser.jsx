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
import { editUser, getUserId } from "../../../redux/actions/actions";

export const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    dispatch(getUserId(id));
  }, [dispatch, id]);
  const users = useSelector((state) => state.users);
  if (users && !users.isActive) {
    users.isActive = "f";
  }

  const [changeUser, setChangeUser] = useState({
    name: "",
    identification: "",
    email: "",
    numPhone: "",
    address: "",
    // password: "",
    image: [],
    isActive: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (
      users.name &&
      users.identification &&
      users.email &&
      users.numPhone &&
      users.address &&
      users.isActive &&
      //   users.password &&
      users.image
    ) {
      setChangeUser({
        name: users.name,
        identification: users.identification,
        email: users.email,
        numPhone: users.numPhone,
        address: users.address,
        isActive: users.isActive,
        // password: users.password,
        image: users.image,
      });
    }
  }, [
    users.name,
    users.identification,
    users.email,
    users.numPhone,
    users.address,
    users.isActive,
    //   users.password,
    users.image,
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
    // console.log("Datos enviados: ", changeUser);
    dispatch(editUser(id, changeUser));
    toast.success("¡Edit user successfully!");
    navigate("/usuario");
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

  return (
    <div className={styles.container}>
      <h4>Edit User</h4>

      <form onSubmit={handleSubmit}>
        {/* _____________NAME________________ */}
        <div className={`${styles.field} ${styles["input-field"]}`}>
          <input
            type="text"
            name="name"
            placeholder="Fullname"
            className={`form-control ${errors.name && "is-invalid"}`}
            onChange={handleChange}
            value={changeUser.name}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        {/* _____________EMAIL________________ */}
        <div className={`${styles.field} ${styles["input-field"]}`}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`form-control ${errors.email && "is-invalid"}`}
            onChange={handleChange}
            value={changeUser.email}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        {/* _____________ID________________ */}
        <div className={`${styles.field} ${styles["input-field"]}`}>
          <input
            type="text"
            name="identification"
            placeholder="Document ID"
            className={`form-control ${errors.identification && "is-invalid"}`}
            onChange={handleChange}
            value={changeUser.identification}
          />
          {errors.identification && (
            <div className="invalid-feedback">{errors.identification}</div>
          )}
        </div>
        {/* _____________PHONE NUMBER________________ */}
        <div className={`${styles.field} ${styles["input-field"]}`}>
          <input
            type="text"
            name="numPhone"
            placeholder="Phone N°"
            className={`form-control ${errors.numPhone && "is-invalid"}`}
            onChange={handleChange}
            value={changeUser.numPhone}
          />
          {errors.numPhone && (
            <div className="invalid-feedback">{errors.numPhone}</div>
          )}
        </div>
        {/* _____________ADDRESS________________ */}
        <div className={`${styles.field} ${styles["input-field"]}`}>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className={`form-control ${errors.address && "is-invalid"}`}
            onChange={handleChange}
            value={changeUser.address}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>

        {/* Estado del usuario */}
        <div className={`${styles.field} ${styles["input-field"]}`}>
          <select
            className="form-control mb-3 w-100"
            name="isActive"
            value={changeUser.isActive}
            onChange={handleChange}
          >
            <option value="t">Activo</option>
            <option value="f">Inactivo</option>
          </select>
        </div>
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

        <button type="submit" class="btn btn-dark">
          edit user
        </button>
      </form>
    </div>
  );
};
