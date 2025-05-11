import React, { useState } from 'react'
import cardData from '../../Data/CardData.json'

const UserCard = () => {

 

  return (
    <div className=' flex flex-col p-4 items-center w-[300px] rounded-xl h-full aspect-[3/4] border-1 shadow-md transition-500 bg-gray-50 hover:scale-102 m-4'>
        <div className='h-2/3 w-full bg-gray-50 border-2 border-dashed my-2'>

        </div>
        <div className='w-full  flex flex-col items-start justify-items-start p-2 my-2'>
          <h3 className='font-bold text-2xl font-sans'>
            title name
          </h3>
          <p className='font-light text-sm inset-1'>
            a paragraph or context
          </p>
        </div>
        <div>
          {tags.map((tag) => {
            <div className={`bg-gray-100 border-1 border-gray-500 px-2 py-1 rounded-md hover:bg-gray-200`}>
              {tag}
            </div>
          })}
        </div>
    </div>
  )
}


export default UserCard