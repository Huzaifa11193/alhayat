

import React from 'react'
import SubHeading from '../../../components/SubHeading'
import Card from '../../../components/Card'

const SamplingArticle = () => {
  return (
    <div>
      <SubHeading title={'Sampling B#0001'} />
      <div className="flex gap-2 justify-center gird grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
      
      {[1, 2].map((index) => (
       <Card key={index} value={"B#000"+index}/>
      ))}
    </div>
    </div>
    
  )
}

export default SamplingArticle