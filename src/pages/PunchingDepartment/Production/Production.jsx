
import React,{ useEffect, useState }  from 'react'
import Card from '../../../components/Card'
import SubHeading from '../../../components/SubHeading'
import SearchInput from '../../../components/SearchInput'
import { CiCirclePlus } from "react-icons/ci";
import { Button, Checkbox, Label, Modal, TextInput} from 'flowbite-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const API_URL = process.env.REACT_APP_API_URL;

const Production = () => {
  
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [productionData, setProductionData] = useState([]);
  const [search, setSearch] = useState('');


  function onCloseModal() {
    setOpenModal(false);
    setTitle('');
  }
  const addProduction = async () => {
    if(title === '' || title === null || title === undefined || title === ' ' ){
      alert('Please enter title');
      return;
    }
    const isValidTitle = /^B#\d+/.test(title);
    
    if (!isValidTitle) {
      alert('Title should have a number after "B#".');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/punching/production`, {
        data: {
          title: title
        }
      });
      alert("Added Successfully");
    } catch (error) {
      alert(error);
    }
  };

  const getProduction = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/punching/production`,
        {
          params: {
            search
          }
        }
      );
      setProductionData(response.data.data[0].production);
      
    
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setTitle("B#");

    getProduction()
  }, []);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [BookNoForDelete,setBookNoForDelete] = useState();
  const [_idNo, set_idNo] = useState(0);

  const [BNo, setBNo] = useState("");

  const deleteData = async (title) => {
    try {
      const response = await axios.delete(`${API_URL}/api/punching/production/`+encodeURIComponent(title));
      
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
      setBookNoForDelete("");  
      getProduction()
    } catch (error) {
      console.error(error);
    }
  };

  const searchProduction = async () => {
    try {
      getProduction()
    
    } catch (error) {
      console.error(error);
    }
  };  
  return (
    <div>
     <SubHeading title={'Production'} />
    
   <div className="flex gap-2 justify-center gird grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
    <Button color="blue" className=' h-14 mb-2' onClick={() => setOpenModal(true)}><CiCirclePlus size={37}/></Button>
    <div className='mb-8 w-96 '>
    <form onSubmit={(e) => {e.preventDefault(); searchProduction()}}>   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} required type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black " placeholder="Search..." />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
    </form>
    </div>
    </div>

      {/* delete prompt */}
      
<Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
        <Modal.Header className='dark:bg-white dark:text-black'  />
        <Modal.Body className='dark:bg-white dark:text-black'>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-black" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              rr  Are you sure you want to remove this record enter {BNo} ?
            </h3>
            <input type="text" value={BookNoForDelete} onChange={(e) => setBookNoForDelete(e.target.value)} required className='mb-5 h-10 w-30 border border-gray-300 '/>
            <div className="flex justify-center gap-4">
              <Button color="failure" disabled={BookNoForDelete !== BNo} onClick={() =>  deleteData(BNo)}>
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


    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={addProduction}>

          
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
    
    

    <div className="flex gap-2 justify-center gird grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
      
    {productionData
  .filter(production => production.title === undefined) // Filter out objects with 'title' property
  .map((production, index) => {
    const key = Object.keys(production)[0]; // Get the key dynamically
    return (
      <Card onClick={() => {setBNo(key); setOpenDeleteModal(true); }} key={index} url={`/Punching/Production/Article/${encodeURIComponent(key)}`} value={`${key}`} />
    );
  })}
    </div>

    </div>
  )
}

export default Production