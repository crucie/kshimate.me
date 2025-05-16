import React, { useState } from 'react'

const UserCard = ({Title, Description, Image, Tags}) => {



  return (
    <div className='flex flex-col p-4 items-center w-[300px] rounded-xl h-full aspect-[3/4] border-1 shadow-md transition-300 bg-gray-50 hover:scale-102 m-4'>
        <div className='h-2/3 w-full bg-gray-50 border-2 border-dashed my-2'>
          {Image && <img src={Image} alt={Title} className='h-full w-full object-cover rounded-md'/>}
        </div>
        <div className='w-full flex flex-col items-start justify-items-start p-2 my-2'>
          <h3 className='font-bold text-2xl font-sans'>{Title}</h3>
          <p className='font-light text-sm inset-1'>{Description}</p>
        </div>

        <div className='w-full flex flex-wrap gap-2'>
          {Tags && Tags.map((tag, index) => (
            <div 
               key={index} 
               className='bg-gray-100 border-1 border-gray-500 px-2 py-1 rounded-md hover:bg-gray-200'>
              {tag}
            </div>
          ))}
        </div>
    </div>
  )
}


export default UserCard