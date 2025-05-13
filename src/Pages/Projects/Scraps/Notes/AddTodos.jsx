import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'

function AddTodos() {

  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const addTodoHandler = (e) => {
    e.preventDefault()
    dispatch(addTodo(input))
    setInput('')
  }
  
  return (
    <form 
    onSubmit = {addTodoHandler} 
    className="space-x-3 mt-12">
        <input 
            type = "text"
            className = "bg-gray-400 p-3 rounded borde transition-colors duration-200 ease-in-out"
            placeholder= "Enter a todo...."
            value={input}
            onChange= {(e) => setInput(e.target.value)}
        />
        <button 
        type = "submit"
        className = " text-black hover:text-white bg-indigo-50 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
        > 
            Add Todo
        </button>

        </form>
  )
}

export default AddTodos