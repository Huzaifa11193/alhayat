import React,{useEffect, useState} from 'react'
import SubHeading from '../../components/SubHeading'

import { Table,Button,Modal} from 'flowbite-react';
import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { IoIosAdd, IoIosColorFill, IoIosRemove } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import SearchInput from '../../components/SearchInput'
import Spreadsheet from 'react-spreadsheet';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CiBarcode } from "react-icons/ci";
import Barcode from 'react-barcode';

const API_URL = process.env.REACT_APP_API_URL;


function CuttingArticleId() {

  const params = useParams();


   const data1 =  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }];
    
  const [data, setData] = useState([ ]);
 

  const [getCuttingData, setGetCutting] = useState();


  // useEffect(() => {
  //   const getProduction = async () => {
  //     try {
  //       const excludedIndices = [0, 1, 2, 5, 6, 9, 12, 13, 14];

  //       const response = await axios.get(`${API_URL}/api/punching/production/article/`+encodeURIComponent(params.key)+"/"+encodeURIComponent(params.title));

  //     const filterdata = response.data.data[0].value;

  //     const spliceData = filterdata.map(element =>
  //       element.filter((_, index) => !excludedIndices.includes(index))
  //     );
      
  //       const record = Array.isArray(response.data.data[0].value)==false ? [data1] :  spliceData
  //       setData(record);

  //        console.log(data);


  //         console.log(getCuttingData);
          

  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };



   
  //   getCutting();
  // }, []);



  const [data_, setData_] = useState([]);

  


  useEffect(() => {

    // const getMarket = async () => {
    //   try {
    //     const response = await axios.get(`${API_URL}/api/market/`);
    //     setData(response.data.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // getMarket();
    const getProduction = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/production/` + encodeURIComponent(params.key) + "/" + encodeURIComponent(params.title));
        setData_(response.data["data"][0]["data"]);

        const spliceData =  response.data["data"][0]["data"];

     

        const initailValues = [...new Set(spliceData.map(element =>  element["Fabric"]))].filter(uniqueValue => 
          uniqueValue !== null && uniqueValue !== undefined && uniqueValue !== '' 
        );

        const record = Array.isArray(response.data["data"][0]["data"])==false ? [data1] :  spliceData
        
         
        const market_response = await axios.get(`${API_URL}/api/market/`+encodeURIComponent(params.key)+"/"+encodeURIComponent(params.title));
        const market_data = market_response.data.data;

        const cutting_response = await axios.get(`${API_URL}/api/cutting/`+encodeURIComponent(params.key)+"/"+encodeURIComponent(params.title));    
        console.log(cutting_response.data);
        const cuttingData= cutting_response.data.data !== null ?   cutting_response.data.data[params.title] :null;
          console.log(cuttingData);

        const mydt = {
          "Required": Object.fromEntries( initailValues.map( (element_,index) => [element_, 
           
             record.filter(element => element["Fabric"] === element_).reduce((acc, element) => acc + parseFloat(element["Yard/Meter"]), 0)
          ])),
          "Market": Object.fromEntries(initailValues.map(element => [element,
            market_data.filter(element_ => element_["Fabric"] === element).reduce((acc, element) => acc + parseFloat(element["Yard"]), 0)
          ])),
          "Reject": Object.fromEntries(initailValues.map(element => [
            element,
            cuttingData !== null 
              ? cuttingData.filter(element_ => element_["Fabric"] === element)
              : ""
          ])),
          "Total": Object.fromEntries(initailValues.map(element => [element, ""])),
        }

        setGetCutting(mydt)
        
      } catch (error) {
        console.error(error);
      }
    };


    const getCutting = async () => {
      try {
    
        const response = await axios.get(`${API_URL}/api/cutting/`+encodeURIComponent(params.key)+"/"+encodeURIComponent(params.title));
     // console.log(response.data.data[params.title]); 

      setGetCutting(response.data.data[params.title]);

      
      } catch(error) {
        console.error(error);
      }
    };



    getProduction();
    getCutting();
  }, []);



  
  const handleInputChange = (category, property, value) => {
    setGetCutting(prevData => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [property]: value,
      },
      
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/cutting/${encodeURIComponent(params.key)}/${encodeURIComponent(params.title)}`, getCuttingData);
      
      // Check the response and handle accordingly
      if (response.data && response.data.message) {
 
        toast.success(response.data.message, {
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
        console.log('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  const calculateTotal = (property, getCuttingData) => {
    // Sum the numeric values from other categories
    // const total = ["Required", "Market", "Reject"].reduce((acc, category) => {
    //   const value = getCuttingData[category] ? parseFloat(getCuttingData[category][property]) || 0 : 0;
    //   return acc + value;
    // }, 0);
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
  const [OpenBarcodeModal, setOpenBarcodeModal] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);


  const saveDepartment = async() => {
    console.log(data_);
    try{

      const response = await axios.post(`${API_URL}/api/cutting/assign_department/${encodeURIComponent(params.key)}/${encodeURIComponent(params.title)}`, {
        data: data_,
      });
     if(response.status === 200){
      toast.success("Saved Successfully", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    else{
      toast.error("Failed to Save", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      }
    }
    catch(error){
      console.error(error);
     
    }
    
  }
  

  return (
  


    <div>


<Modal show={OpenBarcodeModal} size="lg" onClose={() => setOpenBarcodeModal(false)} popup>
        <Modal.Header className='dark:bg-white dark:text-black'  />
        <Modal.Body className='dark:bg-white dark:text-black'>
          <div className="text-center justify-center flex">
          <Barcode value={barcodeData} />
          </div>
          <div className="mt-3">
            <div className="flex justify-center gap-4">
              {/* <Button color="failure">
                {"Yes, I'm sure"}
              </Button> */}
              <Button color="gray" onClick={() => setOpenBarcodeModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>


        <SubHeading title={params.key+' - '+params.title} />

     

{/*         
    <Tabs theme={customTheme} className='justify-center'  aria-label="Tabs with icons" style="underline">
      <Tabs.Item active title="Market" icon={CiShop} className='dark:text-black dark:bg-white'>
      <div className="overflow-x-auto mt-5">

<h2 class="text-4xl font-bold dark:text-black mb-4">Market</h2>


<div className='flex justify-center'>
<SearchInput/>

</div>

<Spreadsheet
  data={data}
  onChange={handleChange}
  columnLabels={['P 1', 'P 2', 'P 3', 'Fabric', 'Article', 'PR Suit', 'Stiches', 'Head', 'Round', 'C/Rate', 'Y/M', 'Round Final', 'Quantity', 'T.Stitch', 'Days']}
/>
<div className='flex justify-start'>
<button onClick={addRow} className='mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded mr-1 ml-1 w-5 h-5'> <IoIosAdd size={20} /> </button>
<button onClick={removeRow} className='mt-2 bg-red-500 hover:bg-blue-700 text-white rounded w-5 h-5'> <IoIosRemove size={20} /></button>
</div>


</div>
      </Tabs.Item>
      <Tabs.Item title="Deying" icon={IoIosColorFill}>
      <div className="overflow-x-auto mt-5">

<h2 class="text-4xl font-bold dark:text-black mb-4">Deying</h2>


<div className='flex justify-end'>
<SearchInput/>
</div>
  <Table className=' dark:text-black'>
 
    <Table.Head>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Date</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Fabric</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Meter</Table.HeadCell>

    
    </Table.Head>
    <Table.Body className="divide-y">
      <Table.Row className="bg-white dark:border-gray-200 dark:bg-gray-300">
        
        <Table.Cell>Sliver 2</Table.Cell>
        <Table.Cell>Laptop 2</Table.Cell>
        <Table.Cell>$2999</Table.Cell>
        
      </Table.Row>
    
    </Table.Body>
  </Table>
</div>
      </Tabs.Item>
      <Tabs.Item title="Cutting" icon={FaCut}>
      <div className="overflow-x-auto mt-5">

<h2 class="text-4xl font-bold dark:text-black mb-4">Cutting</h2>


<div className='flex justify-end'>
<SearchInput/>
</div>
  <Table className=' dark:text-black'>
 
    <Table.Head>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Date</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Fabric</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Meter</Table.HeadCell>

    
    </Table.Head>
    <Table.Body className="divide-y">
      <Table.Row className="bg-white dark:border-gray-200 dark:bg-gray-300">
        
        <Table.Cell>Sliver 3</Table.Cell>
        <Table.Cell>Laptop 3</Table.Cell>
        <Table.Cell>$2999</Table.Cell>
        
      </Table.Row>
    
    </Table.Body>
  </Table>
</div>
      </Tabs.Item>
      <Tabs.Item title="ShortFall" icon={FaArrowDownShortWide}>
      <div className="overflow-x-auto mt-5">

<h2 class="text-4xl font-bold dark:text-black mb-4">ShortFall</h2>


<div className='flex justify-end'>
<SearchInput/>
</div>
  <Table className=' dark:text-black'>
 
    <Table.Head>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Date</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Fabric</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Meter</Table.HeadCell>

    
    </Table.Head>
    <Table.Body className="divide-y">
      <Table.Row className="bg-white dark:border-gray-200 dark:bg-gray-300">
        
        <Table.Cell>Sliver 4</Table.Cell>
        <Table.Cell>Laptop 4</Table.Cell>
        <Table.Cell>$2999</Table.Cell>
        
      </Table.Row>
    
    </Table.Body>
  </Table>
</div>
      </Tabs.Item>
      <Tabs.Item title="Extra" icon={CiCirclePlus}>
      <div className="overflow-x-auto mt-5">

<h2 class="text-4xl font-bold dark:text-black mb-4">Extra</h2>


<div className='flex justify-end'>
<SearchInput/>
</div>
  <Table className=' dark:text-black'>
 
    <Table.Head>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Date</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Fabric</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Meter</Table.HeadCell>

    
    </Table.Head>
    <Table.Body className="divide-y">
      <Table.Row className="bg-white dark:border-gray-200 dark:bg-gray-300">
        
        <Table.Cell>Sliver 5</Table.Cell>
        <Table.Cell>Laptop 5</Table.Cell>
        <Table.Cell>$2999</Table.Cell>
        
      </Table.Row>
    
    </Table.Body>
  </Table>
</div>
      </Tabs.Item>
    </Tabs> */}

<div id='market' className="overflow-x-auto mt-5 mb-5">

<h2 class="text-4xl font-bold dark:text-black mb-4">Cutting</h2>


<div className='flex justify-center'>
<SearchInput/>

</div>


{/* <Spreadsheet
  data={data_}

  columnLabels={['Fabric', 'Article', 'Head', 'Round', 'Y/M', 'Round Final']}
/> */}

<Button onClick={saveDepartment} className='flex justify-left mt-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white rounded w-20 h-10'>save</Button>


<Table className=' dark:text-black'>
 
    <Table.Head>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Fabric</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Article</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Head</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Round</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Y/M</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Round Final</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Deparment</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'></Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {data_.map((row, index) => (
        <Table.Row key={index} className="bg-white dark:border-gray-200 dark:bg-gray-300">
          
            <Table.Cell>{row["Fabric"]}</Table.Cell>
            <Table.Cell>{row["Article"]+ "  " + row["Article-type"]}</Table.Cell>
            <Table.Cell>{row["Head"]}</Table.Cell>
            <Table.Cell>{row["Round"]}</Table.Cell>
            <Table.Cell>{row["Yard/Meter"]+ "  "+ row["Y/M-type"]}</Table.Cell>
            <Table.Cell>{row["Round Final"] +"  "+ row["RF-type"]}</Table.Cell>
            <Table.Cell>
              <select                
                className="bg-[#F9FAFB] border border-gray-300 text-gray-900 text-sm  rounded-lg w-60 h-12"
                value={row["Department"]}
                onChange={(e) => {
                  const newData = [...data_];
                  newData[index]["Department"] = e.target.value;
                  setData_(newData);
               
                }}
              >
                <option selected>Select Depatment</option>
                <option value="Department A">Department A</option>
                <option value="Department B">Department B</option>
              </select>
            </Table.Cell>
            <Table.Cell>
            <button
              onClick={() => {
                setOpenBarcodeModal(true);
                setBarcodeData(
                   row["Fabric"],
                );
               }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            >
             
              <CiBarcode size={35} />
            </button>
            </Table.Cell>        
        </Table.Row>
      ))}
     
    
    </Table.Body>
  </Table>


          </div> 


<Button onClick={handleSaveClick} className='flex justify-left mt-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white rounded w-20 h-10'>save</Button>



{getCuttingData ? (
  <div className='mt-5 overflow-scroll'>
    <Table>
    <Table.Head>
  <Table.HeadCell className='dark:bg-gray-400 dark:text-black'></Table.HeadCell>

  {[...new Set(data_.map(element => element["Fabric"]))].map((uniqueValue, index) => (
    <Table.HeadCell key={index} className='dark:bg-gray-400 dark:text-black'>
      {uniqueValue}
    </Table.HeadCell>
  ))}
</Table.Head>
    <Table.Body className="divide-y">
    {["Required", "Market", "Reject", "Total"].map((category, index) => (
    <Table.Row key={index} className="bg-white dark:border-gray-200 dark:bg-gray-300 dark:text-black">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">{category}</Table.Cell>
      {getCuttingData[category] && Object.keys(getCuttingData[category]).map((property, propIndex) => (
        <Table.Cell key={propIndex} className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
          
          <input
            disabled={category === "Total" || category === "Required" || category === "Market"}
            className='h-10 w-30 border border-gray-300'
            type="number"
            value={category === "Total" ? calculateTotal(property,getCuttingData) : getCuttingData[category][property]}
            onChange={(e) => handleInputChange(category, property, e.target.value)}
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

export default CuttingArticleId