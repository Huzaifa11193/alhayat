import React from 'react'
import SubHeading from '../../components/SubHeading'
import Card from '../../components/Card'
import { Tabs,TextInput,Button,Table } from 'flowbite-react';
import SearchInput from '../../components/SearchInput';
function Finishing() {
  return (
    <div>
    <SubHeading title={'Finishing Department'} />




    <div className='flex justify-end'>
  <SearchInput/>
    </div>

    <Table>
 
 <Table.Head>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>B#4223</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>D#3243</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Qalamkar</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Lot:505</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Golden</Table.HeadCell>
 </Table.Head>
</Table>


<div className="overflow-x-auto mt-5">




<Table>
 
 <Table.Head>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Fabric</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>S.no</Table.HeadCell> 
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Articles</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>PR Suit</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Stiches</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>head</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>ROund Final</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Quantity</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>T.Stitch</Table.HeadCell>
   <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Days</Table.HeadCell>

 
 </Table.Head>
 <Table.Body className="divide-y">
   <Table.Row className="bg-white dark:border-gray-200 dark:bg-gray-300 dark:text-black">
     
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">Cotton</Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">1</Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">G</Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">Yes</Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">Yes</Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">Yes</Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black bg-gray-300 dark:bg-gray-200">Yes</Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">1</Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">Yes</Table.Cell>
     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">10</Table.Cell>
     
   </Table.Row>
 
 </Table.Body>
</Table>



<div className="pt-4 flex justify-end">
  <h3 className='pr-4  font-bold'>Total: 1000</h3>

  
</div>
<div className="pb-2 flex justify-end">
    <h3 className='pr-4  font-bold'>Days: 10</h3>
  
</div>



</div>




  </div>

  )
}

export default Finishing