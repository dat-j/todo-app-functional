import { useContext, useEffect, useRef, useState } from "react";
import { useReducer } from "react";
import { BrowserRouter,Route, Link } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Toggle from "./components/Toggle";
import { themeContext } from "./components/ThemeProvider";
import TodolistTest from "./components/TodolistTest";
import axios from 'axios';
import Donate from "./components/Donate";
// =======================================================
export const filterStatus = {
  all: "all",
  done: "done",
  notDone: "notDone"
};
function todoReducer(arr, action){
  switch(action.type){
    case 'add':{
      return [
        {
          id: new Date().valueOf(),
          text: action.text,
          isDone: false,
        },
        ...arr,
      ];
    }
    case 'delete':{
      return arr.filter(item => item.id !== action.id);
    }
    case 'update':{
      return arr.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, id: action.id,text:action.text };
        }
        return todo ;
      });
    }
    case 'checkbox':{
      return arr.map((todo)=>
        todo.id===action.id?{...todo, isDone: !todo.isDone}:todo);
    }
  }
}
let res = await axios.get('https://6588fac4324d4171525855f8.mockapi.io/api/todos');
// >ES13 can use await at top-level-module without async


const App = () => {
  const [arr, dispatch] = useReducer(todoReducer, res.data);
  const [scroll, setScroll]= useState(false);
  const {theme} = useContext(themeContext);
  const headerRef = useRef(null);
  const [status,setStatus] = useState(filterStatus.all);
  const setTodoStatus = (value)=>{
    setStatus(value);
  }
  // const [list, setList] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
        
  //       const response = await axios.get('https://6588fac4324d4171525855f8.mockapi.io/api/todos');
  //       setList(response.data); 
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData(); 
  // }, []); 
  
  // useEffect(() => {
  //   axios.get('https://6588fac4324d4171525855f8.mockapi.io/api/todos')
  //     .then(res => {
  //       console.log(res)
  //       return res.data;
  //     })
  // }, []);

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
  function addTodo(text){
    dispatch({
      type:'add',
      text:text,
    })
  }
  function delTodo(id){
    dispatch({
      type:'delete',
      id:id,
    })
  }
  function updateTodo(id,text){
    dispatch({
      type:'update',
      id:id,
      text:text,
    })
  }
  function clickCheckBox(item){
    dispatch({
      type:'checkbox',
      id:item.id,
    })
  }
  
  return (
      <div className={"w-3/4 !h-[610px] bg-red-300 mx-auto " + theme}>
      <h1 className="text-center text-8xl text-rose-400 font-bold">TODOS</h1>
      <Header ref={headerRef} addTodo={addTodo} updateTodo={updateTodo} />
      <Toggle toggleScroll={toggleScroll} />
      <TodoList
        arr={filterByStatus(arr, status)}
        editTodoHeader={editTodoHeader}
        scroll={scroll}
        delTodo={delTodo}
        clickCheckBox={clickCheckBox}
        updateTodo={updateTodo}
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
