import React, { useEffect, useState } from 'react'
import {
    Formik,
    useFormik,
    FormikHelpers,
    FormikProps,
    Form,
    FieldArray,
    Field,
    ErrorMessage,
    useFormikContext,
    FieldProps,
  } from 'formik';
  import * as Yup from 'yup';
  import { Modal, Table,Button } from 'flowbite-react';
  import axios from 'axios';
import { toast } from 'react-toastify';
import { Fab, Box, Tooltip } from '@mui/material';

import { FaFileExcel } from "react-icons/fa";
import ImageIcon from '@mui/icons-material/Image';

import SaveIcon from '@mui/icons-material/Save';
import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import FileUploadForm from './FileUploadForm';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Link } from '@react-pdf/renderer';
import { CSVLink } from 'react-csv';


const API_URL = process.env.REACT_APP_API_URL;

function ExcelForm( {columns,bookid,designid} ) {

  const [data_, setData] = useState([]);
  const [header , setHeader] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [totalTstitch, setTotalTstitch] = useState(0);
  const [AvgStiches, setAvgStiches] = useState(0);
  const [GivenRate, setGivenRate] = useState(0);
  const [TargetRate, setTargetRate] = useState(0);

  const [openImageModal, setOpenImageModal] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
const [suitCost, setSuitCost] = useState(0);

const [openModal, setOpenModal] = useState(false);

const [indexNo, setIndexNo] = useState(0);

const [createdAt, setCreatedAt] = useState("");
const [updatedAt, setUpdatedAt] = useState("");


const productionScheme = Yup.object().shape({
  header: Yup.object().shape({
    lot: Yup.number().required('Lot is required'),
    type: Yup.string().required('Type is required'),
    color: Yup.string().required('Color is required'),
  }),
  AvgStiches: Yup.number().required('Average Stitches is required'),
  GivenRate: Yup.number().required('Given Rate is required'),
  TargetRate: Yup.number().required('Target Rate is required'),
  data: Yup.array().of(
    Yup.object().shape({
      // Add validation rules for each field in your data array
      // Example:
      Stiches: Yup.number().required('Stiches is required'),
      Round: Yup.number().required('Round is required'),
      // Add more fields as needed
    })
  ),
});



  useEffect(() => {
    const getProduction = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/production/` + encodeURIComponent(bookid) + "/" + encodeURIComponent(designid));
        setData(response.data["data"][0]["data"]);
        setHeader(response.data["data"][0]["header"]);
        setAvgStiches(response.data["data"][0]["AvgStiches"]);
        setGivenRate(response.data["data"][0]["GivenRate"]);
        setTargetRate(response.data["data"][0]["TargetRate"]);
       
       
        setTotalDays(calculateTotalDays(response.data["data"][0]["data"]));
        setTotalTstitch(calculateTotalTstitch(response.data["data"][0]["data"]));
        setSuitCost(calculateTotalSumCost(response.data["data"][0]["data"])/response.data["data"][0]["header"]["lot"]);
        setCreatedAt(response.data["data"][0]["createdat"]);
        setUpdatedAt(response.data["data"][0]["updatedat"]);
        

      } catch (error) {
        console.error(error);
      }
    };
    getProduction();
  }, [bookid, designid]);


  const calculateTotalDays = (data) => {
    let total = 0;
    data.forEach((row) => {
      // Assuming 'days' is the field in your data array
      total += parseInt(row.Days, 10) || 0;
    });
    return total;
  };


  const calculateTotalTstitch = (data) => {
    let total = 0;
    data.forEach((row) => {
      // Assuming 'days' is the field in your data array
      total += parseInt(row['Total Stiches'], 10) || 0;
    });
    return total;
  };


  const calculateTotalSumCost = (data) => {
    let total = 0;
    data.forEach((row) => {
      // Assuming 'days' is the field in your data array
      total += parseInt(row['Cost'], 10) || 0;
    });
    return total;
  };

  
  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
  
    return new Date(date).toLocaleString('en-US', options);
  };


  const generatePDF = (data) => (
    <Document>
      <Page size="A4" orientation="landscape">
        <View style={styles.page}>
          
  
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {Object.keys(data[0]).map((key) => (
                <View key={key} style={styles.tableHeaderCell}>
                  <Text style={styles.headerText}>{key}</Text>
                </View>
              ))}
            </View>
            {data.map((user, index) => (
              <View key={index} style={styles.tableRow}>
                {Object.keys(user).map((key) => (
                  <View key={key} style={styles.tableCell}>
                    <Text style={styles.cellText}>{user[key]}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      padding: 20,
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#AAAAAA',
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableHeaderCell: {
      borderBottomColor: '#AAAAAA',
      borderBottomWidth: 1,
      padding: 8,
      backgroundColor: '#f2f2f2',
    },
    headerText: {
      fontSize: 10,
      fontWeight: 'bold',
    },
    tableCell: {
      borderBottomColor: '#AAAAAA',
      borderBottomWidth: 1,
      padding: 8,
    },
    cellText: {
      fontSize: 10,
    },
  });


  const headers = Object.keys(data_.length > 0 ? data_[0] : {});


  return (
  
    <>

<Modal show={openImageModal} onClose={() => setOpenImageModal(false)}>
        <Modal.Header>Image</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">

          <FileUploadForm bookid={bookid} designid={designid}/>
    
          </div>
        </Modal.Body>
        
      </Modal>


      



<Tooltip title="Excel">

<Fab
        color='primary'
        className='bg-blue-500'
        style={{ position: 'fixed', bottom: '16px', right: '16px' }}
      >
        <CSVLink data={data_} headers={headers} filename="data.csv">
       < FaFileExcel size={26} /> 
       </CSVLink>
      </Fab>

      </Tooltip>
      <Tooltip title="Image">
      <Fab
        color='primary'
        className='bg-blue-500'
        style={{ position: 'fixed', bottom: '16px', right: '76px' }}
        onClick={() => setOpenImageModal(true)}
      >
       < ImageIcon/> 
      </Fab>
      </Tooltip>


 <div class=" relative pt-10 ">
    <Formik initialValues={{ data : data_, header : {
      lot: header['lot'],
      type: header['type'],
      color: header['color'],
    },

      AvgStiches: AvgStiches,
      GivenRate: GivenRate,
      TargetRate : TargetRate,
    
  }}  enableReinitialize={true} 
  

  onSubmit={async (values, { setValues, setFieldValue }) => {
    try {
      // Update 'Total Stiches', 'Days', and 'Cost' in each row of data
      const updatedData = values.data.map((row) => {
        const totalStitches = row['Stiches'] * row['Round'];
        const days = totalStitches / values.AvgStiches;
        const cost = (row['Head'] * totalStitches / 1000) * values.GivenRate;
  
        return {
          ...row,
          'Total Stiches': totalStitches,
          'Days': days,
          'Cost': cost,
        };
      });
  
      // Update the entire values object
      setValues({
        ...values,
        data: updatedData,
      });
  
      const postData = {
        data: updatedData,
        bookid: bookid,
        designid: designid,
        header: values.header,
        AvgStiches: values.AvgStiches,
        GivenRate: values.GivenRate,
        TargetRate: values.TargetRate,
      };
  
      // Send updated data to the server
      const post_response = await axios.post(`${API_URL}/api/production/`, postData);
  
      if (post_response.status >= 200 && post_response.status < 300) {
        // Update any other state or perform additional actions
        setTotalDays(calculateTotalDays(updatedData));
        setTotalTstitch(calculateTotalTstitch(updatedData));
        setSuitCost(calculateTotalSumCost(updatedData) / values.header['lot']);
  
        toast.success(post_response.data.message, {
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
        alert(`Error: ${post_response.status} - ${post_response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request.", {
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
  }}
  
       

render={({ values,resetForm  }) => (

    <Form>
<div className='flex justify-end'>
<h2 className='text-lg text-black font-extrabold'>Created At: {formatDate(createdAt)}</h2>
</div>
<div className='flex justify-end'>
<h3 className='text-lg text-black font-extrabold'>Updated At: {formatDate(updatedAt)}</h3>
</div>
    <button type="submit">
    <Tooltip title="Save">
    <Fab
        color='primary'
        className='bg-blue-500'
        style={{ position: 'fixed', bottom: '16px', right: '140px' }}
      ><SaveIcon />
      </Fab>
      </Tooltip>
    </button>
    
    <table class=" w-full text-lg text-left rtl:text-right text-gray-500 dark:text-black">
    <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-black ">
            <tr>
                <th scope="col" class="px-6 py-3">{bookid}</th>
                <th scope="col" class="px-6 py-3">{designid}</th>
                <th scope="col" class="px-6 py-3">
                <div className='flex'><p className='mt-3 mr-2'>Type:</p>
                <Field 
                    as="select"
                    required
                    name={`header.type`}
                    className="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                      >
                    <option value="">Select Type</option>
                   
                    <option value={"Qalamakar"}>
                        {"Qalamakar"}
                    </option>
                    <option value={"Qalamakar Cotton"}>
                        {"Qalamakar Cotton"}
                    </option>
                   
                </Field>
                </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div className='flex'><p className='mt-3 mr-2'>Lot:</p>
                <Field min={1} required type="number" name={`header.lot`} className="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "    />
                </div>
                </th>
                <th scope="col" class="px-6 py-3">
                <div className='flex'><p className='mt-3 mr-2'>Color:</p>
                <Field
                   as="select"
                   required
                   name={`header.color`}
                   className="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                     >
                   <option value="">Select Color</option>
                  
                   <option value={"Golden"}>
                       {"Golden"}
                   </option>
                   <option value={"White"}>
                       {"White"}
                   </option>
                  
               </Field>
               </div>
                </th>

            </tr>
        </thead>
    </table>

    <table class=" w-full text-lg text-left rtl:text-right text-gray-500 dark:text-black">
    <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-black ">
            <tr>
               
                <th scope="col" class="px-6 py-3 ">
                <div className='flex'><p className='mt-3 mr-2'>Avg Stiches:</p>
                  
                <Field min={1} required type="number" name={`AvgStiches`} className="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "    />              
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 ">
                <div className='flex'><p className='mt-3 mr-2'>Given Rate:</p>
                  
                <Field min={1} required type="number" name={`GivenRate`} className="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "    />              
                </div>
                </th>
                <th scope="col"  class="px-6 py-3 ">
                <div className='flex'><p className='mt-3 mr-2'>Target Rate:</p>
          
                <Field min={1} required type="number" name={`TargetRate`}   className="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "  />              
                </div>
                </th>

                <th scope="col"  class="px-6 py-3 ">
                <div className='flex'>
                  <button onClick={()=>{
                    resetForm();
                    setHeader({type:"",lot:"0",color:""});
                    setAvgStiches(0);
                    setGivenRate(0);
                    setTargetRate(0);
                  }} type='button' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Reset</button>             
                </div>
                </th>
                
               

            </tr>
        </thead>
    </table>
    
    <div className='overflow-x-scroll mt-5'>
    <table class=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-black">

        <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-black">
            <tr>
            <th>
                    Action
                </th>
                {columns.map((column) => (
                    <th scope="col" class="px-6 py-3">
                    {column.heading}
                </th>
                ))}
                <th>
                    Action
                </th>

            </tr>
        </thead>
        <tbody>
        <FieldArray name="data"
        render={(arrayHelpers) => (
   
            
        values.data && values.data.length > 0 ? (
          
            values.data.map((item,index_) => (
          
              
              
            <tr key={index_} class="bg-white border-b dark:bg-white ">

            <td >
              <div className='flex items-center'>
                    <button className='ml-2 text-red-500 font-bold   '  type="button" onClick={() => {
                      setOpenModal(true);
                      setIndexNo(index_);

                    }}>
                    <RemoveIcon size={100} />
                    </button>
                    {/* push into specific index */}
                    
                    <button className='ml-2 text-green-500 font-bold ' type="button"  
                    onClick={() => {
                        const defaultRow = {};
                        columns.forEach((column) => {
                          defaultRow[column.title] = '';
                          defaultRow[column.subTitle] = '';
                          
                        });
                        arrayHelpers.insert(index_ + 1, defaultRow);
                      }}
                    >
                      <Add size={100} />
                      </button> 
                      </div>
                </td>
                        
            {columns.map((column,index) => (
                <td  key={column.title} class="px-6  py-4">
                {column.type=="text" &&
                    <Field required type="text" name={`data.${index_}.${column.title}`}  class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " />
                }
                {column.type=="email" &&
                    <Field required type="email" name={`data.${index_}.${column.title}`}   class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900  text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "  />
                }
                {column.type=="number" ?
                  
                  column.title!="Total Stiches" ?
                    <Field required type="number" disabled={column.title === 'Days' || column.title === 'Cost' ? true : false}   name={`data.${index_}.${column.title}`}    class="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "  />
                  :     
                    <Field required type="number"  value={column.title === 'Total Stiches' ? item["Stiches"] * item["Round"] : 0}   name={`data.${index_}.${column.title}`}  disabled  class="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "  />
                : ""

                  }



             

               {column.type === 'select' && (
                <Field
                    as="select"
                    required
                    name={`data.${index_}.${column.title}`}
                    className="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                >
                    <option value="">Select {column.title}</option>
                    {column.option.map((row, indexData) => (
                    <option key={indexData} value={row.value}>
                        {row.title}
                    </option>
                    ))}
                </Field>
                )}


                {column.type=="text_with_select" &&
                <>
                <div className='flex'>
                <Field required type="text" name={`data.${index_}.${column.title}`}  class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " />
           
                    <Field
                    required
                    as="select"   name={`data.${index_}.${column.subTitle}`}  class=" w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " >
                           <option value={""}>Select {column.subTitle}</option>
                            {column.option.map((row,indexData) => (
                                <option value={row.value}>{row.title}</option>
                            ))}
                            
                    </Field>
                    </div>
                    </>
                }


            {column.type=="number_with_select" &&
                <>
                <div className='flex'>
                <Field required type="number" name={`data.${index_}.${column.title}`}  class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5" />
       
                    <Field
                    required
                    as="select"   name={`data.${index_}.${column.subTitle}`}  class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 " >
                           <option value={""}>Select {column.subTitle}</option>
                            {column.option.map((row,indexData) => (
                                <option value={row.value}>{row.title}</option>
                            ))}
                            
                    </Field>
                    </div>
                    </>
                }

              {column.type=="number_with_text" &&
                <>
                <div className='flex'>
                <Field required type="number" name={`data.${index_}.${column.title}`}  class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5" />
       
                <Field required type="text" name={`data.${index_}.${column.subTitle}`}  class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5" />
       


                    </div>
                    </>
                }

                {column.type=="sno" &&
                    <p>{index_+1}</p>
                }
                {column.type=="image" &&
                <div className='flex'>
                <img height={"100px"} data-modal-target="default-modal" data-modal-toggle="default-modal" width={"100px"} src={values.data[index_][column.title]} alt="" />

                    <Field type="file" name={`data.${index_}.${column.title}`}  
                    value={""}
                    class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-lg  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "  />
                </div>
                }

                </td>
            ))}

                <td >
                <div className='flex items-center'>
                    <button className='ml-2 text-red-500 font-bold'  type="button" onClick={() => {
                      setOpenModal(true);
                      setIndexNo(index_);

                    }}>
                      <RemoveIcon size={100} />
                    </button>
                  
                    
                    <button className='ml-2 text-green-500 font-bold ' type="button"  
                    onClick={() => {
                        const defaultRow = {};
                        columns.forEach((column) => {
                          defaultRow[column.title] = '';
                          defaultRow[column.subTitle] = '';
                          
                        });
                        arrayHelpers.insert(index_ + 1, defaultRow);
                      }}
                    >
                      <Add size={100} />
                      </button> 
                      </div>

                      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
<Modal.Header className='dark:bg-white dark:text-black'  />
<Modal.Body className='dark:bg-white dark:text-black'>
  <div className="text-center">
    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-black" />
    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to remove this record?
    </h3>
    <div className="flex justify-center gap-4">
      <Button color="failure"onClick={() => {  arrayHelpers.remove(indexNo); setOpenModal(false)}}>
        {"Yes, I'm sure"}
      </Button>
      <Button color="gray" onClick={() => setOpenModal(false)}>
        No, cancel
      </Button>
    </div>
  </div>
</Modal.Body>
</Modal>
         

                </td>

            

            
        </tr>

        ))
        ) : (
            <button type="button" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={() => arrayHelpers.push('')}>
              Add Row
            </button>
          )
        
        )}
      
        />
                    
           


        </tbody>
    </table>
    </div>



    <div className='flex justify-end'>
    <h1 className='text-lg text-black font-extrabold'>Days :- {totalDays}</h1>
    </div>
    <div className='flex justify-end'>
    <h1 className='text-lg text-black font-extrabold'>Total Stiches :- {totalTstitch}</h1>
    </div>
    
    <div className='flex justify-end pb-10'>
    <h1 className='text-lg text-black font-extrabold'>Suit Cost :- {suitCost}</h1>
    </div>
    
    </Form>
     )}
    />

           


</div>



    </>
  )
}

export default ExcelForm



