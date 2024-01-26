import React,{useEffect, useState} from 'react'
import SubHeading from '../../components/SubHeading'
import Card from '../../components/Card'
import LinkButton from '../../components/LinkButton'
import { CiCirclePlus } from "react-icons/ci";
import { FaCut } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { Pagination, Table ,TextInput} from 'flowbite-react';
import { FaArrowDownShortWide } from "react-icons/fa6";
import { Modal,Button} from 'flowbite-react';
import SearchInput from '../../components/SearchInput'
import Spreadsheet from 'react-spreadsheet';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import moment from 'moment';

import { Datepicker } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

function MarketReceivedTable() {
  
  const [selectedValue, setSelectedValue] = useState();
  const [items, setItems] = useState([]);


  const [items2, setItems2] = useState([]);
  const [selecteddesignNumber, setselectedDesignNumbers] = useState();
  const [selectedFabric, setselectedFabric] = useState();
  const [inputYard, setinputYard] = useState();
  const [inputQuantity, setinputQuantity] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [BookNoForDelete,setBookNoForDelete] = useState();

  const [inputUnit,setinputUnit] = useState();
  const [inputQtype,setinputQtype] = useState();

  const [_idNo, set_idNo] = useState(0);
  const [BNo, setBNo] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);

  const [ search, setSearch] = useState('');


  const [getCuttingData, setGetCutting] = useState({
    "Required": {
      "KAPRA": "",
      "NET": "",
      "MALAI": "",
      "ORGANZA": ""
    },
    "Market": {
      "KAPRA": "",
      "NET": "",
      "MALAI": "",
      "ORGANZA": ""
    },
    "Reject": {
      "KAPRA": "",
      "NET": "",
      "MALAI": "",
      "ORGANZA": ""
    },
    "Total": {
      "KAPRA": "",
      "NET": "",
      "MALAI": "",
      "ORGANZA": ""
    }
  });


  
  const fetchBookNo = (inputValue) => {
    return axios.get(`${API_URL}/api/punching/production`).then((result) => {
      const allProducts = result.data.data[0].production;
    

      // Prioritize items that match the search query in the title
      const matchingProducts = allProducts.filter((product) =>
      Object.keys(product)[0].toLowerCase().includes(inputValue.toLowerCase())
      );
      
      // Sort the results to prioritize matching products
      const sortedProducts = matchingProducts.concat(
        allProducts.filter((product) => !matchingProducts.includes(product))
      );
   
      setItems(sortedProducts); // Set the items for the table
      return sortedProducts.map((item) => ({ value: Object.keys(item)[0], label: Object.keys(item)[0] }));
    });
  };


 
  

  const handleInputChange = (newValue) => {
    // No need to set the input value in the state
  };
  const handleChange = (newValue) => {
  
    setSelectedValue(newValue);
    fetchDesignNo(newValue.value);
  };


  const getOptionValue = (option) => option.value;
  const getOptionLabel = (option) => option.label;



  const fetchDesignNo = (bookNo) => {
    
  
    const designNumbersForBook = items.filter((item) => Object.keys(item)[0] === bookNo);
    const designNumbersArray = designNumbersForBook.length > 0 ? Object.values(designNumbersForBook[0])[0] : [];
  
    const data = [];
    
    Object.keys(designNumbersArray).forEach((key, index) => {
     
      data.push({ [Object.keys(designNumbersArray)[index]]: { value: designNumbersArray[key], label: key } });
    });
   
 
  
    setItems2(data); // Set the items for the table
  
  };

  const selectDesignNoValue = (designNo) => {
    setselectedDesignNumbers(designNo);
  
  };

  const selectFabricValue = (fabric) => {
    setselectedFabric(fabric);
  };

  const [data, setData] = useState([]);


  const getCutting = async (key,title) => {
    try {
      const response = await axios.get(`${API_URL}/api/cutting/`+encodeURIComponent(key)+"/"+encodeURIComponent(title));    
    setGetCutting(response.data.data[title]);
      
    } catch (error) {
      console.error(error);
    }
  };

  const [data_, setData_] = useState([]);

  const getProductRecord = async (bookid,designid) => {
    try {
      const product_response = await axios.get(`${API_URL}/api/production/` + encodeURIComponent(bookid) + "/" + encodeURIComponent(designid));
      setData_(product_response.data["data"][0]["data"]);
      console.log(product_response.data["data"][0]["data"]);
    } catch (error) {
      console.error(error);
    }
  };







  const submitData = async () => {
    
    try {
      const data = {
        "B#": selectedValue.value,
        "D#": selecteddesignNumber,
        "Fabric": selectedFabric,
        "Yard": inputYard,
        "Unit": inputUnit,
        "Quantity": inputQuantity,
        "Qtype": inputQtype,
        "date" : moment().format("DD-MMM-YYYY, h:mm:ss a")
      }
       const response = await axios.post(`${API_URL}/api/market`, {
        value: data,
        //  date :  moment().format("DD-MMM-YYYY")
      });

      //clear Value
      setinputYard("");
      setinputUnit("");
      setinputQuantity("");
      setinputQtype("");
      setselectedFabric("");
      setselectedDesignNumbers("");

      fetchData(currentPage);
    

      toast.success("Added Successfully", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });


    } catch (error) {
      console.error(error);
    }
  };


  const handleCuttingData = ()=>{
    getCutting(selectedValue.value,selecteddesignNumber);
  }


  const calculateTotal = (property, getCuttingData) => {
    // Sum the numeric values from other categories
    const total = ["Required", "Market", "Reject"].reduce((acc, category) => {
      const value = getCuttingData[category] ? parseFloat(getCuttingData[category][property]) || 0 : 0;
      
      // Adjust the calculation based on your formula
      if (category === "Required") {
        acc += value;
      } else if (category === "Market") {
        acc -= value;
      } else if (category === "Reject") {
        acc += value; // Adjust this part based on your formula
      }
    
      return acc;
    }, 0);
    
    return total;
  };

  const deleteData = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/api/market/delete`, {
        id: id,
      });
      
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
      setOpenModal(false);
      setBookNoForDelete("");


    } catch (error) {
      console.error(error);
    }
  };


  // const getYardValue = ()=>{

  //   return  data_.filter(
  //     (item) => item["Fabric"] === selectedFabric
  //    ).reduce((acc, curr) => acc + curr["Yard/Meter"], 0);
  // }


  const onPageChange = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`${API_URL}/api/market`, {
        params: {
          page,
          pageSize,
          search,
        },
      });
      setData(response.data.data);

      // Calculate total pages based on the total items and page size
      const totalItems = response.data.totalItems; // Replace with the actual key in your API response
      const calculatedTotalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, pageSize, search]);

  return (
    <div>


<Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header className='dark:bg-white dark:text-black'  />
        <Modal.Body className='dark:bg-white dark:text-black'>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-black" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to remove this record enter {BNo} ?
            </h3>
            <input type="text" value={BookNoForDelete} onChange={(e) => setBookNoForDelete(e.target.value)} required className='mb-5 h-10 w-30 border border-gray-300 '/>
            <div className="flex justify-center gap-4">
              <Button color="failure" disabled={BookNoForDelete !== BNo} onClick={() =>  deleteData(_idNo)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    <SubHeading title={'Daily Market Received' } />

    <div className='text-gray-500 pb-4'>
    <small>{moment().format("DD-MMM-YYYY, h:mm:ss a")}</small>
    </div>

<form onSubmit={(e) => {e.preventDefault();submitData()}}>


 
    <Table>
 
 <Table.Head>
 <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>B#</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>D#</Table.HeadCell> 
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Fabric</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Yard</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Quantity</Table.HeadCell>
 </Table.Head>
 <Table.Body className="divide-y">
   <Table.Row className="bg-white dark:border-gray-200 dark:bg-gray-300 dark:text-black">
     
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
     <AsyncSelect
     required
        cacheOptions
        placeholder="Select B#"
        defaultOptions
        value={selectedValue}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        loadOptions={(inputValue) => fetchBookNo(inputValue)}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
     </Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
  <select required value={selecteddesignNumber} onChange={(e) => {selectDesignNoValue(e.target.value); getProductRecord(selectedValue.value,e.target.value) }} className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 '>
    <option key="default" value="" className='text-black'>
      Select D#
    </option>
    {items2.map((element, index) => (
    
      <option className='text-black' key={`option_${index}`} value={Object.keys(element)[0]}>
        {Object.keys(element)[0]}
      </option>
    ))}
  </select>
</Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
     <select required onChange={(e) => selectFabricValue(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:border-blue-500 block w-full p-2.5'>
      
  <option key="default" value="" className='text-black'>
    Select Fabric
  </option>

  {[...new Set(data_.map(valueElement => valueElement["Fabric"]))].map((fabric, index) => (
    <option className='text-black' key={`option_${index}`} value={fabric}>
      {fabric}
    </option>
  ))}
</select>

     </Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
      <div className='flex'>
      <input type="text" value={inputYard} onChange={(e) => setinputYard(e.target.value)} required className='h-10 w-30 border border-gray-300 '/>
      &nbsp;
      <select required value={inputUnit} onChange={(e) => { setinputUnit(e.target.value) } } className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 '>
      <option value="" className='text-black'>Select Unit</option>
      <option className='text-black'  value={"YARD"}>
        YARD
      </option>
      <option className='text-black'  value={"METER"}>
        METER
      </option>
   
  </select>
  </div>
      </Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
     <div className='flex'>
      <input type="text" value={inputQuantity}  onChange={(e) => setinputQuantity(e.target.value)} required className='h-10 w-30 border border-gray-300 '/>
      &nbsp;
      <select required value={inputQtype} onChange={(e) => { setinputQtype(e.target.value) } } className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 '>
      <option value="" className='text-black'>Select Q-Type</option>
      <option className='text-black'  value={"PALLA"}>
        PALLA
      </option>
      <option className='text-black'  value={"BORA"}>
        BORA
      </option>
      <option className='text-black'  value={"BUNDLE"}>
        BUNDLE
      </option>
      <option className='text-black'  value={"THAN"}>
        THAN
      </option>
      
   
  </select>
  </div>
      </Table.Cell>
    
     
   </Table.Row>
 
 </Table.Body>
</Table>

<Button type='submit' className='flex justify-left mt-2 mb-2 bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 text-white rounded w-20 h-10'>save</Button>

</form>

    
<div className="overflow-x-auto mt-5">


<div className='flex  justify-end'>

<div className='mb-8 w-96 '>

    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black " placeholder="Search..." required/>
      
    </div>

</div>

    </div>
    


<Table>
<Table.Head>
 <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>B#</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>D#</Table.HeadCell> 
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Fabric</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Yard</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Quantity</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Date</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Action</Table.HeadCell>
 </Table.Head>

 <Table.Body className="divide-y">

 {data.map((element, index) => (
        <Table.Row className="bg-white dark:border-gray-200 dark:bg-gray-300 dark:text-black" key={index}>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">{element["B#"]}</Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">{element["D#"]}</Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">{element["Fabric"]}</Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">{element["Yard"] + " " + element["Unit"]}</Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">{element["Quantity"]+ " " + element["Qtype"]}</Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">{element["date"]}</Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
            <button
              onClick={() => {setOpenModal(true);set_idNo(element["_id"]); setBNo(element["B#"]); }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>

       


          </Table.Cell>
        </Table.Row>
      ))}

 
 </Table.Body>
</Table>

<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
   

</div>


<div className='mt-10'>
  <Table>
<Table.Body className="divide-y">
   <Table.Row className="bg-white dark:border-gray-200 dark:bg-gray-300 dark:text-black">
     
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
     <AsyncSelect
     required
        cacheOptions
        placeholder="Select B#"
        defaultOptions
        value={selectedValue}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        loadOptions={(inputValue) => fetchBookNo(inputValue)}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
     </Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
  <select required onChange={(e) => selectDesignNoValue(e.target.value)} className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-blue-500 block w-full p-2.5 '>
    <option key="default" value="" className='text-black'>
      Select D#
    </option>
    {items2.map((element, index) => (
    
      <option className='text-black' key={`option_${index}`} value={Object.keys(element)[0]}>
        {Object.keys(element)[0]}
      </option>
    ))}
  </select>
</Table.Cell>

     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black"> <Button onClick={handleCuttingData} className='flex justify-left mt-2 mb-2 bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 text-white rounded w-20 h-10'>Filter</Button>
</Table.Cell>

    
     
   </Table.Row>
 
 </Table.Body>
 </Table>

 
</div>

 {getCuttingData && items2.length > 0  ? (
  <div className='mt-10'>
    <Table>

  <Table.Head>
 <Table.HeadCell className='dark:bg-gray-400 dark:text-black'></Table.HeadCell>
 {["Required"].map((category, index) => (

  getCuttingData[category] && Object.keys(getCuttingData[category]).map((property, propIndex) => (
     <Table.HeadCell className='dark:bg-gray-400 dark:text-black' key={`option_${propIndex}`} value={property}>
      {property}
    </Table.HeadCell>
    
     
      ))
      
  ))}

 </Table.Head>

    <Table.Body className="divide-y">
      {["Required", "Market", "Reject", "Total"].map((category, index) => (
        <Table.Row key={index} className="bg-white dark:border-gray-200 dark:bg-gray-300 dark:text-black">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">{category}</Table.Cell>

          {getCuttingData[category] && Object.keys(getCuttingData[category]).map((property, propIndex) => (
            <Table.Cell key={propIndex} className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
           <input
                className='h-10 w-30 border border-gray-300'
                type="number"
                value={category === "Total" ? calculateTotal(property,getCuttingData) : getCuttingData[category][property]}
                disabled
              />
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
    </Table>
  </div>
) : <></>}
 


</div>
  )
}

export default MarketReceivedTable