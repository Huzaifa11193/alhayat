import React from 'react'
import SubHeading from '../../components/SubHeading'
import Card from '../../components/Card'
import { Accordion,Table,Tabs } from 'flowbite-react';

import { CustomFlowbiteTheme } from 'flowbite-react';

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


const AccordionTheme = {
  "root": {
    "base": "divide-y divide-gray-200 border-gray-200 dark:divide-gray-700 dark:border-gray-700",
    "flush": {
      "off": "rounded-lg border",
      "on": "border-b"
    }
  },
  "content": {
    "base": "py-5 px-5 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg"
  },
  "title": {
    "arrow": {
      "base": "h-6 w-6 shrink-0",
      "open": {
        "off": "",
        "on": "rotate-180"
      }
    },
    "base": "flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium text-gray-500 dark:text-gray-400",
    "flush": {
      "off": "hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800",
      "on": "bg-transparent dark:bg-transparent"
    },
    "heading": "",
    "open": {
      "off": "",
      "on": "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white"
    }
  }
};

function Index() {
  return (
    <div>
    <SubHeading title={'Production'} />

<Tabs aria-label="Full width tabs" className='justify-center  shadow-none  ' theme={customTheme} style="underline"   >

      <Tabs.Item active title="Department A" >
 
 

<h2 class="text-4xl font-bold dark:text-black mb-4">Department A</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
{[1, 2, 3, 4, 5].map((index) => (
<Accordion key={index}  className="w-full " >
  <Accordion.Panel className='dark:bg-gray-300'>
    <Accordion.Title className='dark:bg-gray-300 dark:focus:ring-0 dark:text-black dark:hover:bg-gray-300 dark:border-none'>{"M#" + index}</Accordion.Title>
    <Accordion.Content className='dark:bg-gray-300  '>
    <h2 class="text-md font-bold  mb-4 dark:text-black">24 Head</h2>
    <Table>
         
         <Table.Head>
           <Table.HeadCell className='dark:bg-gray-400 dark:text-black' >Stich</Table.HeadCell>
           <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Round</Table.HeadCell>
          
 
         
         </Table.Head>
         <Table.Body className="divide-y">
           <Table.Row className="bg-white dark:border-gray-200 dark:text-black dark:bg-gray-300">
             
             <Table.Cell className='dark:text-black dark:bg-gray-200'>5000</Table.Cell>
             <Table.Cell className='dark:text-black dark:bg-gray-200'>2</Table.Cell>
             
             
           </Table.Row>
         
         </Table.Body>
       </Table>

    </Accordion.Content>
  </Accordion.Panel>
</Accordion>
))}
</div>


      </Tabs.Item>

      <Tabs.Item active title="Department B" >
 
 
 
 
      <h2 class="text-4xl font-bold dark:text-black mb-4">Department B</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
{[1, 2, 3, 4, 5].map((index) => (
<Accordion key={index}  className="w-full " >
  <Accordion.Panel className='dark:bg-gray-300'>
    <Accordion.Title className='dark:bg-gray-300 dark:focus:ring-0 dark:text-black dark:hover:bg-gray-300 dark:border-none'>{"M#" + index}</Accordion.Title>
    <Accordion.Content className='dark:bg-gray-300  '>
    <h2 class="text-md font-bold  mb-4 dark:text-black">24 Head</h2>
    <Table>
         
         <Table.Head>
           <Table.HeadCell className='dark:bg-gray-400 dark:text-black' >Stich</Table.HeadCell>
           <Table.HeadCell className='dark:bg-gray-400 dark:text-black'>Round</Table.HeadCell>
          
 
         
         </Table.Head>
         <Table.Body className="divide-y">
           <Table.Row className="bg-white dark:border-gray-200 dark:text-black dark:bg-gray-300">
             
             <Table.Cell className='dark:text-black dark:bg-gray-200'>5000</Table.Cell>
             <Table.Cell className='dark:text-black dark:bg-gray-200'>2</Table.Cell>
             
             
           </Table.Row>
         
         </Table.Body>
       </Table>

    </Accordion.Content>
  </Accordion.Panel>
</Accordion>
))}
</div>

      </Tabs.Item>
    
      
    </Tabs>






  </div>

  )
}

export default Index