import React, { useRef } from "react";
import Todo from "./Todo";
import { useScroll } from "../hooks/useScroll";

const TodolistTest = (props) => {
  const scrollRef = useRef(null);
  const { arr } = props;
  const scrollObj = useScroll(scrollRef,arr);
  return (
    <div
      ref={scrollRef}
      className="h-72 w-[70%] bg-transparent my-0 mx-auto overflow-x-hidden overflow-scroll"
    >
      <ul className="flex flex-col items-center">
        <li>
          {scrollObj.list.map((todo, index) => (
            <Todo key={todo.id} index={index} todo={todo} {...props} />
          ))}
        </li>
      </ul>
      {scrollObj.loading && <div className="flex justify-center">
            <div className="dashed-loading"></div>
          </div> }
    </div>
  );
};

export default TodolistTest;
