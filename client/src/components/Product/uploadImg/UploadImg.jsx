import React, { useState } from "react";
import { Input } from "reactstrap";
import axios from "axios";
import loadingImg from "../../../assets/loading.png";

export const UploadImg = ({ onImageUpload }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const uploadImages = async (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) {

      alert("You can only upload 3 images per product.");
      return;
    }

    const newSelectedImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "images");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/prodelevatepf/image/upload",
        data
      );
      const imageUrl = response.data.secure_url;
      newSelectedImages.push(imageUrl);
    }

    setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...newSelectedImages]);
    onImageUpload(newSelectedImages); // Guardar las imágenes inmediatamente después de cargarlas
  };

  return (
    <div>
      <Input 
      type="file" 
      name="file" 
      placeholder="Upload image product" 
      onChange={uploadImages} multiple 
      custom // Agregamos la prop custom
      customLabel="Choose files"
      />

      {selectedImages.length > 0 &&
        selectedImages.map((img, index) => (
          <img key={index} src={img} style={{ display: "none" }} alt="Uploaded" />
        ))}

    </div>
  );
};