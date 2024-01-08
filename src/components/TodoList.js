import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Todo from "./Todo";
import WithScroll from "./HOC";
import "./TodoList.css";

const TodoList = (props) => {
  const { arr, scroll, list, handleScroll, loading } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;
  const handlePageClick = (e) => {
    setCurrentPage(e.target.value);
  };
  //logic todoLIST
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = arr?.slice(indexOfFirstTodo, indexOfLastTodo);
  //logic page Number
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(arr?.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }
  //===============logic scroll===============
  return (
    <div>
      {scroll == false ? (
        <div>
          <div className="h-64 w-[70%] bg-transparent my-0 mx-auto">
            <ul className="flex flex-col items-center">
              <li>
                {currentTodos?.map((todo, index) => (
                  <Todo key={todo.id} index={index} todo={todo} {...props} />
                ))}
              </li>
            </ul>
          </div>
          <ul className="flex space-x-5 justify-center">
            {pageNumbers.map((pageNumber) => (
              <li
                className={
                  currentPage === pageNumber
                    ? "font-bold cursor-pointer"
                    : "cursor-pointer"
                }
                key={pageNumber}
                value={pageNumber}
                onClick={handlePageClick}
              >
                {pageNumber}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          onScroll={handleScroll}
          className="h-72 w-[70%] bg-transparent my-0 mx-auto overflow-x-hidden overflow-scroll"
        >
          <ul className="flex flex-col items-center">
            <li>
              {list?.map((todo, index) => (
                <Todo key={todo.id} index={index} todo={todo} {...props} />
              ))}
            </li>
          </ul>
          {loading && (
            <div className="flex justify-center">
              <div className="dashed-loading"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default WithScroll(TodoList);
// export default TodoList;
