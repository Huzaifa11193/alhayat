import React,{ useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import { Button } from 'flowbite-react';
const API_URL = process.env.REACT_APP_API_URL;
const FileUploadForm = ({bookid,designid}) => {

  const [galleryKey, setGalleryKey] = useState(Date.now()); // State variable to force re-render

  const formik = useFormik({
    initialValues: {
      model: 'production',
      modelUniqueValue: bookid.replace(/#/g, '')+designid.replace(/#/g, ''),
      file: null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('model', values.model);
      formData.append('modelUniqueValue',values.modelUniqueValue);
      formData.append('file', values.file);

      try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setGalleryKey(Date.now()); 
        console.log('File uploaded successfully:');
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    },
  });



  return (
    <>
    <form className='flex flex-row items-center' onSubmit={formik.handleSubmit}>
      
      
      <div >
        
        <input
          type="file"
          id="file"
          name="file"
          className='text-black rounded-lg border border-gray-300 p-2 mr-2'
          accept="image/*"
          required
          onChange={(event) => formik.setFieldValue('file', event.target.files[0])}
        />
      </div>
      <div>
        <Button type="submit">Upload</Button>
      </div>
    </form>

    <ImageGallery  key={galleryKey}  model={"production"} modelUniqueValue={bookid.replace(/#/g, '')+designid.replace(/#/g, '')} />
    </>
    
  );
};

export default FileUploadForm;