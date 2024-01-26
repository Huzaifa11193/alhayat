

import React from 'react'

const Text = ({title}) => {
  return (
    <h1 style={{fontSize: '5rem'}} class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
    {title || 'Title'}
</h1>
  )
}

export default Text