import React, {useState} from 'react'

const BlogCard = ({Title, brief, tags}) => {

    const [showMore, setShowMore] = useState(false)

    const fSizeT = " text-3xl"
    const fSizeDesc = "text-lg"
    const tagStyle = "sm:text-sm md:text-md "


  return (
    <div className='w-full border-2 md:min-h-60 h-100 p-4 flex sm:flex-row flex-col justify-between'>
        <div className=' w-full sm:w-2/7 border-1 h-full sm:mx-2'>
            <img src='https://via.placeholder.com/300' alt='blog01' className='bg-gray-200 h-full'/>
        </div>
        <div className='w-full sm:w-5/7 h-full border-1 sm:mx-2 p-4 '>
            <h2 
            className= {` ${fSizeT} font-bold truncate `}
            style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {Title}
            </h2>
            <p 
            className={`${fSizeDesc} font-light truncate overflow-y-clip`}
            style={{
                display: '-webkit-box',
                WebkitLineClamp: showMore ? 'none' : 4, // Show 2 lines by default
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {brief}
            </p>
            
            <div className={`${tagStyle} hidden sm:flex flex-row truncate `}>
                {tags.map((tag, index)=> (
                    <div 
                    key={index} 
                    className='p-1 rounded-md border-1 bg-gray-100/40 m-2' 
                    >
                        {tag}
                    </div>
                ))}
            </div>

        </div>
    </div>
  )
}

export default BlogCard