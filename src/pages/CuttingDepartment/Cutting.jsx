

import React, { useEffect, useState } from 'react'
import SubHeading from '../../components/SubHeading'
import Card from '../../components/Card'
import SearchInput from '../../components/SearchInput'
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Cutting = () => {
  const [productionData, setProductionData] = useState([]);
  useEffect(() => {

    const getProduction = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/punching/production`);
        setProductionData(response.data.data[0].production);
      
      } catch (error) {
        console.error(error);
      }
    };
    getProduction()
  }, []);
  return (
    <div>
        <SubHeading title={'Cutting'} />

        <div className='flex justify-center'>
        <SearchInput/>
        </div>
        


        <div className="flex gap-2 justify-center gird grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
      
      {productionData
    .filter(production => production.title === undefined) // Filter out objects with 'title' property
    .map((production, index) => {
      const key = Object.keys(production)[0]; // Get the key dynamically
      return (
        <Card key={index} url={`/Cutting/Article/${encodeURIComponent(key)}`} value={`${key}`} />
      );
    })}
      </div>


    </div>
  )
}

export default Cutting