import React, { useState } from "react";
import { Input } from "reactstrap";
import axios from "axios";
import loadingImg from "../../../assets/loading.png";
import styles from "./UploadImg.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UploadImg = ({ onImageUpload, uploadedImages, clearUploadedImages }) => {
  const [loading, setLoading] = useState(false);

  const uploadImages = async (event) => {
    const files = event.target.files;
    if (files.length + uploadedImages.length > 3) {
      toast.error('You can only upload 3 images per product.');
      return;
    }

    setLoading(true);
    try {
      const newUploadedImages = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'images');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/prodelevatepf/image/upload',
          data
        );
        const imageUrl = response.data.secure_url;
        newUploadedImages.push(imageUrl);
      }

      if (onImageUpload) {
        onImageUpload([...uploadedImages, ...newUploadedImages]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    if (clearUploadedImages) {
      clearUploadedImages(); // Llama a la función para limpiar las imágenes en CreateUser
    }
    onImageUpload(newImages);
  };

  return (
    <div>
      <Input
        type="file"
        name="file"
        placeholder="Upload image product"
        onChange={uploadImages}
        multiple
      />

      {loading ? <img src={loadingImg} alt="Loading" style={{marginTop:'1rem'}}/> : ''}
      {uploadedImages?.map((img, index) => (
        <div className={styles.divUpload} key={index}>
          <img src={img} style={{ width: '100px', height:'auto', marginTop:'1.9rem' }} alt="Uploaded" />
          <button 
            type="button" 
            onClick={() => handleRemoveImage(index)}
            className={styles.xbutton}>
              X
            </button>
        </div>
      ))}
    </div>
  );
};
