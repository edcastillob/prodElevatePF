import React from 'react'
import { useState } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';
import loadingImg from '../../../assets/loading.png'


export const UploadImg = ({onImageUpload}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

const uploadImages = async (event) => {
    const files = event.target.files;
    // console.log(files)
    if (files.length + images.length > 3) {
      alert('You can only upload 3 images per product.');      
    return;
    }
  
    setLoading(true);
    try {
      const uploadedImages = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file)
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'images');
  
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/prodelevatepf/image/upload',
          data
        );
        const imageUrl = response.data.secure_url;
        uploadedImages.push(imageUrl);
      }
  
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
  
      // Limpiar el campo de entrada de archivos
      event.target.value = null;
      if (onImageUpload) {
        onImageUpload(uploadedImages); // Pasar las URLs de las imágenes al componente padre
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
      
      {loading ? <img src={loadingImg} /> : ''}      
      {images?.map(img => (<img key={img} src={img} style={{width:'300px'}}/>))}
    </div>
  );
};

