import React from 'react'
import SubHeading from '../../components/SubHeading'
import Card from '../../components/Card'
import { Tabs,TextInput,Button,Table,Dropdown } from 'flowbite-react';
import SearchInput from '../../components/SearchInput'




function Cropping() {
  return (
    <div>
    <SubHeading title={'Cropping Department'} />


    



    <div className="overflow-x-auto mt-5">


<div className='flex items-center pb-4 justify-end'>

<div className="flex items-center  gap-4 pr-2 pb-6">
     <select className='bg-[#F9FAFB] border border-gray-300 text-gray-900 text-sm  rounded-lg w-60 h-12   '>
       <option selected>Select Vendor</option>
       <option value="10">Ali</option>
       <option value="20">Salman</option>
       <option value="30">Waqar</option>
     </select>
    
    </div>
    <SearchInput/> 
    
</div>
  <Table>
 
    <Table.Head>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Date</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>BarCode Design</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Quantity</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Round</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Rate</Table.HeadCell>
      <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Status</Table.HeadCell>

    
    </Table.Head>
    <Table.Body className="divide-y">
      <Table.Row className="bg-white dark:border-gray-200 dark:bg-gray-300 dark:text-black">
        
        <Table.Cell>Sliver</Table.Cell>
        <Table.Cell>Laptop</Table.Cell>
        <Table.Cell>2999</Table.Cell>
        <Table.Cell>24</Table.Cell>
        <Table.Cell>2999</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        
      </Table.Row>
    
    </Table.Body>
  </Table>
</div>







  </div>

  )
}

export default Cropping