import React from 'react'
import Nothing from './Scraps/DoNothing/Nothing'
import MagicGrid from '../../Components/Quirky/MagicGrid';
import Dump from '../../Components/Quirky/Dump';


// Example project data - you can move this to Listed.js later
const projects = [
  {
    id: 1,
    title: 'Do Nothing',
    description: 'A game about doing absolutely nothing',
    component: Nothing,
    bgColor: 'bg-purple-200',
    size: 'col-span-2 row-span-2'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Coming soon...',
    bgColor: 'bg-blue-200',
    size: 'col-span-1 row-span-1'
  },
  // Add more projects as needed
];

function Projects() {
  return (
    <div className='flex w-full min-h-screen flex-col align-middle items-center p-8'>
      <h1 className='text-6xl font-bold font-serif mb-12'>
        ...
      </h1>
    
    </div>
  )
}

export default Projects