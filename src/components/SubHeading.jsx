

import React from 'react'
import SubNavbar2 from './SubNavbar2'

const SubHeading = ({title}) => {
  return (
    <div class="flex justify-center items-center mb-4 pb-6">
    <div>
    <h2 class="text-4xl font-bold dark:text-black mb-4 ">{title || 'Title'}</h2>
    <SubNavbar2/>
    </div>
    </div>
    

  )
}

export default SubHeading