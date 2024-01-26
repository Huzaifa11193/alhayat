
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const ImageGallery = ({ model, modelUniqueValue }) => {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_URL}/images/${model}/${modelUniqueValue}`);
        console.log('Images fetched successfully:', response);
        setImages(response.data); // Use response.data
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    
    useEffect(() => {
    
      fetchImages();
    }, [model, modelUniqueValue]);
  
    const handleRemove = async (imageId) => {
      try {
        // Implement the logic to remove the image on the server
        await axios.delete(`http://localhost:9000/remove-image/${imageId}`);
        // Update the state to reflect the removal
        setImages((prevImages) => prevImages.filter((image) => image._id !== imageId));
      } catch (error) {
        console.error('Error removing image:', error.message);
      }
    };

    const openImageInNewTab = (url) => {
        window.open(url, '_blank');
      };

  return (
    <>
    
       
    <div className='flex flex-wrap gap-2'>
   
      {images.map((image) => (
        <div key={image._id} style={{ marginBottom: '10px' }}>
          <img width={100} height={100} src={`http://localhost:9000${image.url}`} alt={image.name}
           onClick={() => openImageInNewTab(`http://localhost:9000${image.url}`)}
           style={{ cursor: 'pointer' }}
          />
          <br />
          <button className=' bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded' onClick={() => handleRemove(image._id)}>Remove</button>
        </div>
      ))}
    </div>
    </>
  );
};

export default ImageGallery;
