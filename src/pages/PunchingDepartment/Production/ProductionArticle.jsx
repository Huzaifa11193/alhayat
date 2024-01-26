

import React,{useEffect, useState} from 'react'
import SubHeading from '../../../components/SubHeading'
import Card from '../../../components/Card'
import { CiCirclePlus } from "react-icons/ci";
import { Button, Checkbox, Label, Modal, TextInput} from 'flowbite-react';
import axios from 'axios';
import {Route, Link, Routes, useParams} from 'react-router-dom';


import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';



const API_URL = process.env.REACT_APP_API_URL;

const ProductionArticle = () => {

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [productionData, setProductionData] = useState([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [DesignNoForDelete,setDesignNoForDelete] = useState();

  const params = useParams();
  const [_idNo, set_idNo] = useState(0);
  const [DNo, setDNo] = useState("");


  function onCloseModal() {
    setOpenModal(false);
    setTitle('');
  }

  function onCloseModal() {
    setOpenModal(false);
    setTitle('');
  }

  const addProduction = async () => {
    if(title === '' || title === null || title === undefined || title === ' ' ){
      alert('Please enter title');
      return;
    }
    const isValidTitle = /^D#\d+/.test(title);
    
    if (!isValidTitle) {
      alert('Title should have a number after "D#".');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/punching/production/article`, {
        data: {
          title: title,
          key: decodeURIComponent(params.key)
        }
      });
      
      alert("Added Successfully");
    } catch (error) {
      alert(error);
    }
  };


  const getProduction = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/punching/production/article/`+encodeURIComponent(params.key));
       setProductionData(response.data.data[0][decodeURIComponent(params.key)]);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    setTitle("D#");

    getProduction();
  }, []);

  const deleteData = async (design) => {
    try {
    
      const response = await axios.delete(`${API_URL}/api/punching/production/article/${encodeURIComponent(params.key)}/${encodeURIComponent(design)}`);
      
      if (response.status === 200) {
        toast.success("Record Deleted Successfully", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        console.error("Deletion failed with status:", response.status);
      }

      setOpenDeleteModal(false);
      setDesignNoForDelete("");
      getProduction()

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
    <SubHeading title={'Production '+decodeURIComponent(params.key)} />


    <div className="flex gap-2 justify-center gird grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
    <Button color="blue" className=' h-14 mb-2' onClick={() => setOpenModal(true)}><CiCirclePlus size={37}/></Button>

    </div>


    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={
            addProduction
          }>

          
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Enter Booking Number</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="Enter title" />
              </div>
              <TextInput
                id="title"
                placeholder="Enter title"
                name='title'
                value={title}
              
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
           
           
            <div className="w-full">
              <Button type="submit">Add</Button>
            </div>

          </div>
          </form>
        </Modal.Body>
      </Modal>



      {/* delete prompt */}
      
<Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
        <Modal.Header className='dark:bg-white dark:text-black'  />
        <Modal.Body className='dark:bg-white dark:text-black'>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-black" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to remove this record enter {DNo} ?
            </h3>
            <input type="text" value={DesignNoForDelete} onChange={(e) => setDesignNoForDelete(e.target.value)} required className='mb-5 h-10 w-30 border border-gray-300 '/>
            <div className="flex justify-center gap-4">
              <Button color="failure" disabled={DesignNoForDelete !== DNo} onClick={() =>  deleteData(DNo)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* end */}
    

    <div className="flex gap-2 justify-center gird grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
    

 {Object.keys(productionData).map((key, index) => (
  
        <Card onClick={()=>{setDNo(key); setOpenDeleteModal(true)}} key={index} value={key} url={`/Punching/Production/Article/${ encodeURIComponent(params.key)}/${encodeURIComponent(key)}`}  />
      ))}
  </div>
  </div>
  )
}

export default ProductionArticle