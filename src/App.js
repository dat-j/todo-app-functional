import { useContext, useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Toggle from "./components/Toggle";
import { themeContext } from "./components/ThemeProvider";
import { todoData } from "./components/TodoData";
// =======================================================
export const filterStatus = {
  all: "all",
  done: "done",
  notDone: "notDone"
};

const App = () => {
  const [arr, setArr] = useState(todoData);
  const {theme} = useContext(themeContext);
  const headerRef = useRef(null);
  const [status,setStatus] = useState(filterStatus.all);
  const setTodoStatus = (value)=>{
    setStatus(value);
  }
  
//filter
  const filterByStatus = (arr, status) => {
    switch (status) {
      case filterStatus.notDone:
        return arr.filter((item) => !item.isDone);
      case filterStatus.done:
        return arr.filter((item) => item.isDone);
      case filterStatus.all:
        return arr;
    }
  };
  const filterItemLeft = (arr) => {
    return arr.filter((item) => !item.isDone);
  };
  const filterItem = (arr, id) => {
    return arr.filter((item) => item.id !== id);
  };
  //addTodo
  const addTodo = (text) => {
    setArr([
      {
        id: new Date().valueOf(),
        text,
        isDone: false,
      },
      ...arr,
    ]);
  };
  //delTodo
  const delTodo = (id) => {
    setArr(filterItem(arr, id));
  };
  //update
  const updateTodo = (id, text) => {
    const newArr=arr.map((todo) => {
      if (todo.id == id) {
        return { ...todo, id: id,text:text };
      }
      return { todo };
    });
    setArr(newArr)
  };
  //focus input
  const editTodoHeader = (id, text)=>{
    if(headerRef.current){
      headerRef.current.editOnFocus(id,text);
    }
  }
  return (
    <div className={"w-3/4 h-[600px] bg-red-300 mx-auto "+ theme }>
      <h1 className="text-center text-8xl text-rose-400 font-bold">TODOS</h1>
      <Header addTodo={addTodo} ref={headerRef} updateTodo={updateTodo}/>
      <Toggle />
      <TodoList arr={filterByStatus(arr, status)} delTodo={delTodo} updateTodo={updateTodo} editTodoHeader={editTodoHeader}/>
      <Footer setTodoStatus={setTodoStatus} todoLeft={filterItemLeft(arr).length}/> 
    </div>
  );
};

export default App;
