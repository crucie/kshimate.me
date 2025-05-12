import React from 'react'
import BlogCard from '../../Components/Cards/BlogCard'


function Blogs() {
  return (
    <div className='w-2/3 mx-auto flex justify-center align-middle'>
      <BlogCard
      Title="This is blog01"
      brief="A short introduction to web development basics. Learn about HTML, CSS, and JavaScript fundamentals that every developer should know."
      tags={["Canvas", "Javascript", "React", "Tailwind" ]}
      />

    </div>
  )
}

export default Blogs