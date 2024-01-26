import React from 'react'
import { IoIosAdd } from "react-icons/io";
const Button = () => {
  return (
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-700 me-2 mb-2">
<IoIosAdd size={25} style={{marginRight: '5px'}} />
Create
</button>
  )
}

export default Button