import React from "react";
import { filterItemLeft, filterStatus } from "./function/todoReducer";
import { connect } from "react-redux";
import { setListStatus } from "../actions/Action";

const Footer = (props) => {
  const { arr } = props;
  return (
    <div className="flex justify-evenly mt-6 space-x-6 w-full">
      <div className="flex space-x-2 border-y-4 border-red-400">
        <span>{filterItemLeft(arr).length}</span>
        <label>todo left</label>
      </div>
      <div className="flex space-x-10">
        <a
          href="#"
          onClick={() => setListStatus(filterStatus.all)}
          className="border-y-4 border-red-400"
        >
          All
        </a>
        <a
          href="#"
          onClick={() => setListStatus(filterStatus.done)}
          className="border-y-4 border-red-400"
        >
          Done
        </a>
        <a
          href="#"
          onClick={() => setListStatus(filterStatus.notDone)}
          className="border-y-4 border-red-400"
        >
          Not Done
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) =>({
  arr: state.todos
})
export default connect(mapStateToProps,null)(Footer);
