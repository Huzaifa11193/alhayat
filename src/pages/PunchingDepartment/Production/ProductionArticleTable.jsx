import React,{useEffect, useState} from 'react'
import SubHeading from '../../../components/SubHeading'
import Card from '../../../components/Card'
import LinkButton from '../../../components/LinkButton'
import { CiCirclePlus } from "react-icons/ci";
import { FaCut } from "react-icons/fa";
import { CiShop } from "react-icons/ci";

import { FaArrowDownShortWide } from "react-icons/fa6";
import { Modal,Button} from 'flowbite-react';
import { IoIosAdd, IoIosColorFill, IoIosRemove } from 'react-icons/io';
import SearchInput from '../../../components/SearchInput'
import Spreadsheet from 'react-spreadsheet';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import {Route, Link, Routes, useParams} from 'react-router-dom';
import axios from 'axios';

import {
  Formik,
  useFormik,
  FormikHelpers,
  FormikProps,
  Form,
  FieldArray,
  Field,
  ErrorMessage,
  FieldProps,
} from 'formik';
import * as Yup from 'yup';
import ExcelForm from '../../../components/ExcelForm';
import FileUploadForm from '../../../components/FileUploadForm';

const API_URL = process.env.REACT_APP_API_URL;

const customTheme = {
  
    "base": "flex flex-col gap-2",
    "tablist": {
      "base": "flex text-center",
      "styles": {
        "default": "flex-wrap border-b border-gray-200 dark:border-gray-700",
        "underline": "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
        "pills": "flex-wrap font-medium text-sm text-gray-500 dark:text-gray-400 space-x-2",
        "fullWidth": "w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-none"
      },
      "tabitem": {
        "base": "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500  focus:outline-none",
        "styles": {
          "default": {
            "base": "rounded-t-lg",
            "active": {
              "on": "bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500",
              "off": "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300"
            }
          },
          "underline": {
            "base": "rounded-t-lg",
            "active": {
              "on": "text-cyan-600 rounded-t-lg border-b-2 border-cyan-600 active dark:text-cyan-500 dark:border-cyan-500",
              "off": "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            }
          },
          "pills": {
            "base": "",
            "active": {
              "on": "rounded-lg bg-cyan-600 text-white",
              "off": "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            }
          },
          "fullWidth": {
            "base": "ml-0 first:ml-0 w-full rounded-none flex",
            "active": {
              "on": "p-4 text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white rounded-none",
              "off": "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none"
            }
          }
        },
        "icon": "mr-2 h-5 w-5"
      }
    },
    "tabitemcontainer": {
      "base": "",
      "styles": {
        "default": "",
        "underline": "",
        "pills": "",
        "fullWidth": ""
      }
    },
    "tabpanel": "py-3"
  
};



function ProductionArticleTable() {

    const [Total , setTotal] = useState(0);
    const [Days , setDays] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const params = useParams();
     const data1 =  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }];
    const [data, setData] = useState([ ]);
  

    const addRecord = async (value) => {
        try {
          const response = await axios.post(`${API_URL}/api/punching/production/article/table`, {
            data: {
              title: decodeURIComponent(params.title),
              key: decodeURIComponent(params.key),
              value : value
            }
          });
          alert("Saved Successfully");
         
        } catch (error) {
          alert(error);
        }
      };
      
    useEffect(() => {
        const getProduction = async () => {
          try {
            const response = await axios.get(`${API_URL}/api/punching/production/article/`+encodeURIComponent(params.key)+"/"+encodeURIComponent(params.title));
          //  console.log(Array.isArray(response.data.data[0].value));

            setData(Array.isArray(response.data.data[0].value)==false ? [data1] :  response.data.data[0].value);

            const totalSumDays = sumLastElement(Array.isArray(response.data.data[0].value)==false ? [data1] :  response.data.data[0].value);
            const totalSum = sum2LastElement(Array.isArray(response.data.data[0].value)==false ? [data1] :  response.data.data[0].value);
            setTotal(totalSum)
            setDays(totalSumDays)

          } catch (error) {
            console.error(error);
          }
        };
        getProduction();
      }, []);
    


  const removeRow = () => {
    if (data.length > 0) {
      const newData = [...data];
      newData.pop(); // Remove the last row
      setData(newData);

      const totalSumDays = sumLastElement(newData);
      const totalSum = sum2LastElement(newData);
      setTotal(totalSum)
      setDays(totalSumDays)

      setOpenModal(false)
    }
  };
  
  const addRow = () => {
    if (!data || !data[0] || typeof data[0].length === 'undefined') {
      // Handle the case where data is undefined or data[0] is undefined or data[0].length is undefined
      setData( [data1]);
      return;
    }
  
    const numColumns = data[0].length;
    const newEmptyRow = Array.from({ length: numColumns }, () => ({ value: '' }));
    const newData = [...data, newEmptyRow];
    setData(newData);
  };
  
  const submit = ()=>{
    console.log(data);
    addRecord(data);
  }

  const sumLastElement = (array) => {
    return array.map((row) => {
      const lastElement = row[row.length - 1];
      const value = parseInt(lastElement.value, 10) || 0; // Parse value as an integer (assuming values are numbers)
      return value;
    }).reduce((acc, curr) => acc + curr, 0);
  };

  const sum2LastElement = (array) => {
    return array.map((row) => {
      const lastElement = row[row.length - 2];
      const value = parseInt(lastElement.value, 10) || 0; // Parse value as an integer (assuming values are numbers)
      return value;
    }).reduce((acc, curr) => acc + curr, 0);
  };

  const handleChange = (changes) => {
    setData(changes);
    const totalSumDays = sumLastElement(changes);
    const totalSum = sum2LastElement(changes);
    setTotal(totalSum)
    setDays(totalSumDays)
  };





  return (
    <div>





        <SubHeading title={"Production"} />


            <div id='market' className="overflow-x-auto mt-5">

<h2 class="text-2xl font-bold dark:text-black mb-4">{params.key+' - '+params.title }</h2>




          </div>

     
  


<ExcelForm  bookid={params.key} designid={params.title} columns={[
      
        {heading:"Sno",title:"Sno",type:"sno"},
        {heading:"Fabric", title:"Fabric",type:"select", option:[{title:"Kapra",value:"Kapra"},{title:"Organiza",value:"Organiza"},
        {  title:"Chiffon",value:"Chiffon"},
        {title:"Malai",value:"Malai"},
        {title:"Net",value:"Net"},
        {title:"Khaddi",value:"Khaddi"},

        {title:"Satan",value:"Satan"},
        {title:"Sonay Ki Chirya",value:"Sonay Ki Chirya"},
      ] },
        { heading:"Article", title:"Article",subTitle:"Article-type",type:"number_with_select" ,option:[{
          title:"CP",value:"CP"},
          {title:"AST",value:"AST"},
          {title:"DAP",value:"DAP"},
          {title:"L",value:"L"},
          {title:"R",value:"R"},

          {title:"FB",value:"FB"},
          {title:"FK",value:"FK"},
          {title:"BK",value:"BK"},
     
          {title:"DP",value:"DP"},
          {title:"AP",value:"AP"},
          {title:"FS",value:"FS"},
          {title:"BD",value:"BD"},
          {title:"BDP",value:"BDP"},
          {title:"FR",value:"FR"},

          { title: "DUP", value: "DUP" },
  { title: "AD", value: "AD" },
  { title: "DA", value: "DA" },
  { title: "MP", value: "MP" },
  { title: "PLU", value: "PLU" },
  { title: "DP1", value: "DP1" },
  { title: "DP2", value: "DP2" },
  { title: "DP3", value: "DP3" },
  { title: "BP1", value: "BP1" },
  { title: "BP2", value: "BP2" },
  { title: "BP3", value: "BP3" },
  { title: "SP", value: "SP" },
  { title: "SD", value: "SD" },
  { title: "BUN", value: "BUN" }
        ]  } ,
        { heading:"PR-Suit", title:"PR-Suit",subTitle:"PR-type",type:"number_with_select" ,option:[
          {title:"PCS",value:"PCS"},
          {title:"ASTEEN BOTI",value:"ASTEEN BOTI"},
          {title:"BP",value:"BP"},
          {title:"FS",value:"FS"},
          {title:"PATI 24 HEAD FS",value:"PATI 24 HEAD FS"}
        ]  },
        { heading:"Stiches", title:"Stiches",type:"number"},
        { heading:"Head", title:"Head",type:"number"},
        { heading:"Round", title:"Round",type:"number"},
        { heading:"C/Rate", title:"C/Rate",type:"number"},
        { heading:"Yard/Meter", title:"Yard/Meter",subTitle:"Y/M-type",type:"number_with_select" ,option:[{title:"YARD",value:"YARD"},{title:"METER",value:"METER"}]  } ,
        { heading:"Round Final", title:"Round Final",subTitle:"RF-type",type:"number_with_text" ,option:[{title:"PALLA",value:"PALLA"},{title:"+8 HEAD",value:"+8 HEAD"},{title:"+7 HEAD",value:"+7 HEAD"},{title:"R",value:"R"}]  } ,
        { heading:"Quantity", title:"Quantity",subTitle:"Quantity-type",type:"number_with_select" ,option:[{title:"PCS",value:"PCS"},{title:"BALAP",value:"BALAP"},{title:"SUITS",value:"SUITS"},{title:"FS",value:"FS"}]  } ,
        { heading:"Total Stiches", title:"Total Stiches",type:"number"},
        { heading:"Days", title:"Days",type:"number"},
        { heading:"Total Cost", title:"Cost",type:"number"},


        ]}/>

            
    </div>
  )
}

export default ProductionArticleTable