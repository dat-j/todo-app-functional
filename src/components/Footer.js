import React from "react";
import { filterStatus } from "../App";

const Footer = ({ todoLeft, setTodoStatus }) => {
  return (
    <div className="flex justify-evenly mt-6 space-x-6 w-full">
      <div className="flex space-x-2 border-y-4 border-red-400">
        <span>{todoLeft}</span>
        <label>todo left</label>
      </div>
      <div className="flex space-x-10">
        <a
          href="#"
          onClick={() => setTodoStatus(filterStatus.all)}
          className="border-y-4 border-red-400"
        >
          All
        </a>
        <a
          href="#"
          onClick={() => setTodoStatus(filterStatus.done)}
          className="border-y-4 border-red-400"
        >
          Done
        </a>
        <a
          href="#"
          onClick={() => setTodoStatus(filterStatus.notDone)}
          className="border-y-4 border-red-400"
        >
          Not Done
        </a>
      </div>
    </div>
  );
};

export default Footer;
