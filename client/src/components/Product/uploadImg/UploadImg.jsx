import React from 'react'
import { useState } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';
import loadingImg from '../../../assets/loading.png'


// // export const UploadImg = ({onImageUpload}) => {
//   export const UploadImg = ({ onImageUpload, clearUploadedImages }) => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

// const uploadImages = async (event) => {
//     const files = event.target.files;
//     // console.log(files)
//     if (files.length + images.length > 3) {
//       alert('You can only upload 3 images per product.');      
//     return;
//     }
  
//     setLoading(true);
//     try {
//       const uploadedImages = [];
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         console.log(file)
//         const data = new FormData();
//         data.append('file', file);
//         data.append('upload_preset', 'images');
  
//         const response = await axios.post(
//           'https://api.cloudinary.com/v1_1/prodelevatepf/image/upload',
//           data
//         );
//         const imageUrl = response.data.secure_url;
//         uploadedImages.push(imageUrl);
//       }
  
//       setImages((prevImages) => [...prevImages, ...uploadedImages]);
  
//       // Limpiar el campo de entrada de archivos
//       event.target.value = null;
//       if (onImageUpload) {
//         onImageUpload(uploadedImages); // Pasar las URLs de las imágenes al componente padre
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div>      
//       <Input
//         type="file"
//         name="file"
//         placeholder="Upload image product"
//         onChange={uploadImages}
//         multiple
//       />
      
//       {loading ? <img src={loadingImg} /> : ''}      
//       {images?.map(img => (<img key={img} src={img} style={{width:'300px'}}/>))}
//     </div>
//   );
// };

// export const UploadImg = ({ onImageUpload, clearUploadedImages }) => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const uploadImages = async (event) => {
//     const files = event.target.files;
//     if (files.length + images.length > 3) {
//       alert('You can only upload 3 images per product.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const uploadedImages = [];
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         const data = new FormData();
//         data.append('file', file);
//         data.append('upload_preset', 'images');

//         const response = await axios.post(
//           'https://api.cloudinary.com/v1_1/prodelevatepf/image/upload',
//           data
//         );
//         const imageUrl = response.data.secure_url;
//         uploadedImages.push(imageUrl);
//       }

//       setImages((prevImages) => [...prevImages, ...uploadedImages]);

//       event.target.value = null;
//       if (onImageUpload) {
//         onImageUpload(uploadedImages);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveImage = (index) => {
//     const newImages = images.filter((img, i) => i !== index);
//     setImages(newImages);
//     if (clearUploadedImages) {
//       clearUploadedImages(); // Llama a la función para limpiar las imágenes en CreateUser
//     }
//   };

//   return (
//     <div>
//       <Input
//         type="file"
//         name="file"
//         placeholder="Upload image product"
//         onChange={uploadImages}
//         multiple
//       />

//       {loading ? <img src={loadingImg} alt="Loading" /> : ''}
//       {images?.map((img, index) => (
//         <div key={img}>
//           <img src={img} style={{ width: '300px' }} alt="Uploaded" />
//           <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
//         </div>
//       ))}
//     </div>
//   );
// };


export const UploadImg = ({ onImageUpload, uploadedImages, clearUploadedImages }) => {
  const [loading, setLoading] = useState(false);

  const uploadImages = async (event) => {
    const files = event.target.files;
    if (files.length + uploadedImages.length > 3) {
      alert('You can only upload 3 images per product.');
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

      {loading ? <img src={loadingImg} alt="Loading" /> : ''}
      {uploadedImages?.map((img, index) => (
        <div key={index}>
          <img src={img} style={{ width: '300px' }} alt="Uploaded" />
          <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

