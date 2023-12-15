import { useContext, useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Toggle from "./components/Toggle";
import { themeContext } from "./components/ThemeProvider";
import { todoData } from "./components/TodoData";
import TodolistTest from "./components/TodolistTest";
// =======================================================
export const filterStatus = {
  all: "all",
  done: "done",
  notDone: "notDone"
};

const App = () => {
  const [arr, setArr] = useState(todoData);
  const [scroll, setScroll]= useState(false);
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
      return todo ;
    });
    setArr(newArr)
  };
  //check box
  const clickCheckBox=(item)=>{
    const cbArr = arr.map((todo)=>
    todo.id===item.id?{...todo, isDone: !todo.isDone}:todo);
    setArr(cbArr);
    console.log(item.id)
  }
  //focus input
  const editTodoHeader = (id, text)=>{
    if(headerRef.current){
      headerRef.current.editOnFocus(id,text);
    }
  }
  //toggle scroll
  const toggleScroll= ()=>{
    setScroll(scroll==false?true:false)
  }
  return (
    <div className={"w-3/4 !h-[610px] bg-red-300 mx-auto " + theme}>
      <h1 className="text-center text-8xl text-rose-400 font-bold">TODOS</h1>
      <Header addTodo={addTodo} ref={headerRef} updateTodo={updateTodo} />
      <Toggle toggleScroll={toggleScroll} />
      <TodoList
        arr={filterByStatus(arr, status)}
        delTodo={delTodo}
        updateTodo={updateTodo}
        editTodoHeader={editTodoHeader}
        clickCheckBox={clickCheckBox}
        scroll={scroll}
      />
      {/* <TodolistTest arr={filterByStatus(arr,status)}/> */}
      <Footer
        setTodoStatus={setTodoStatus}
        todoLeft={filterItemLeft(arr).length}
      />
    </div>
  );
};

export default App;
