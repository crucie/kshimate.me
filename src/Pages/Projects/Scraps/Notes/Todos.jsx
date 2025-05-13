import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'


function Todos() {

    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

  return (
    <>
    <div 
    className='text-white font-6xl font-bold m-4'>
        Todos
    </div>
    {todos.map((todo) => (
        <li 
        key= {todo.id}
        className='w-max-md w-full bg-gray-800 my-2 flex justify-between items-center px-4 py-2 text-white font-bold'>
            <span>{todo.text}</span>
            <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className='px-4 rounded-sm box bg-red-400 text-white mx-4 my-2 '>
                X
            </button>
        </li>
    ))}
    </>
  ) 
}

export default Todos