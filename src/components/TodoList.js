import React, { useState } from 'react'
import Todo from './Todo'
import WithScroll from './HOC';


const TodoList = (props) => {
  const {arr, delTodo} = props;
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;
  const handlePageClick = e =>{
    setCurrentPage(e.target.value);
  }
  //logic todoLIST
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = arr?.slice(indexOfFirstTodo, indexOfLastTodo);
  //logic page Number
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(arr?.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="h-72 w-[70%] bg-transparent my-0 mx-auto  overflow-auto">
      <ul className="flex flex-col items-center">
        <li>
          {currentTodos?.map((todo, index) => (
            <Todo key={todo.id} index={index}todo={todo} {...props}/>
          ))}
        </li>
      </ul>
    </div>
    <ul className='flex space-x-5 justify-center'>
    {
      pageNumbers.map((pageNumber)=>(
        <li className="cursor-pointer"key={pageNumber} value={pageNumber} onClick={handlePageClick}>
        {pageNumber}
        </li>
      ))
    }
    </ul>
    </>
  );
}
const HOC = WithScroll(TodoList);
export default TodoList;