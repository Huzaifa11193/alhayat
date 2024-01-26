

import React, { useEffect, useState } from 'react'
import SubHeading from '../../components/SubHeading'
import Card from '../../components/Card'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const CuttingArticle = () => {

  const [productionData, setProductionData] = useState([]);

  const params = useParams();

  useEffect(() => {

    const getProduction = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/punching/production/article/`+encodeURIComponent(params.key));
         setProductionData(response.data.data[0][decodeURIComponent(params.key)]);
      } catch (error) {
        console.error(error);
      }
    };
    getProduction();
  }, []);


  return (
    <div>
        <SubHeading title={'Cutting '+decodeURIComponent(params.key)} />


        <div className="flex gap-2 justify-center gird grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
    

    {Object.keys(productionData).map((key, index) => (
     
           <Card key={index} value={key} url={`/Cutting/Article/${ encodeURIComponent(params.key)}/${encodeURIComponent(key)}`}  />
         ))}
     </div>
    </div>
  )
}

export default CuttingArticle