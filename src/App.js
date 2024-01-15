//import lib
import { useContext, useEffect, useRef, useState, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

//import css
import "./App.css";
//import function
import {
  todoAction,
  filterByStatus,
  filterItemLeft,
  filterStatus,
  todoReducer,
} from "./components/function/todoReducer";

//import component
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Toggle from "./components/Toggle";
import Loading from "./components/loading/Loading";
import { themeContext } from "./components/ThemeProvider";
import TodolistTest from "./components/TodolistTest";



// ========================done import===============================

const notify = () => {
  toast("done");
};

const App = () => {
  const [list, setList] = useState([]);
  const [arr, dispatch] = useReducer(todoReducer, list);
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(false);
  const { theme } = useContext(themeContext);
  const headerRef = useRef(null);
  const [status, setStatus] = useState(filterStatus.all);
  const setTodoStatus = (value) => {
    setStatus(value);
  };

  //get data from api
  useEffect(() => {
    axios
      .get("https://6588fac4324d4171525855f8.mockapi.io/api/todos")
      .then((res) => {
        dispatch({
          type: todoAction.getData,
          data: res.data,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);
  ///////////////////////////////checking area////////////////////////////
  const check = () => {
    
    console.log("list", list);
  };

  ////////////////////////////////////////////////////////////////////////

  //focus input
  const editTodoHeader = (id, text) => {
    if (headerRef.current) {
      headerRef.current.editOnFocus(id, text);
    }
  };
  //toggle scroll
  const toggleScroll = () => {
    setScroll(scroll == false ? true : false);
  };
  //==================axios CRUD================================
  function addTodo(text) {
    let virtualID = new Date().valueOf();
    let virtualID2 = virtualID;
    dispatch({
      type: todoAction.add,
      text: text,
      id: virtualID
    });
    axios
      .post("https://6588fac4324d4171525855f8.mockapi.io/api/todos", {
        id: virtualID,
        text: text,
        isDone: false,
      })

      .then((res) => {
        
        dispatch({
          type: todoAction.updateID,
          id: res.data.ids,
          virtualID: virtualID
        })
          
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  function delTodo(id) {
    axios
      .delete("https://6588fac4324d4171525855f8.mockapi.io/api/todos/" + id)
      .then((res) => {
        dispatch({
          type: todoAction.delete,
          id: id,
        });
      })
      .catch((err) => {
        console.log("Error:", err, "id:", id);
      });
  }

  function updateTodo(id, text) {
    axios
      .put("https://6588fac4324d4171525855f8.mockapi.io/api/todos/" + id, {
        text: text,
      })
      .then((res) => {
        dispatch({
          type: todoAction.update,
          id: id,
          text: text,
        });
      })
      .catch((err) => {
        console.log("Error:", err, "id:", id);
      });
  }

  function clickCheckBox(item) {
    axios
      .put("https://6588fac4324d4171525855f8.mockapi.io/api/todos/" + item.id, {
        isDone: item.isDone,
      })
      .then((res) => {
        dispatch({
          type: todoAction.checkbox,
          id: item.id,
        });
      })
      .catch((err) => {
        console.log("Error:", err, "id:", item.id);
      });
  }
  return (
    <div className={"w-3/4 !h-[610px] bg-red-300 mx-auto " + theme}>
      <h1 className="text-center text-8xl text-rose-400 font-bold">TODOS</h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <Header ref={headerRef} addTodo={addTodo} updateTodo={updateTodo} />
      <Toggle toggleScroll={toggleScroll} />
      {loading ? (
        <Loading />
      ) : (
        <TodoList
          arr={filterByStatus(arr, status)}
          editTodoHeader={editTodoHeader}
          scroll={scroll}
          delTodo={delTodo}
          clickCheckBox={clickCheckBox}
          updateTodo={updateTodo}
        />
      )}

      {/* <TodolistTest arr={filterByStatus(arr,status)}/> */}
      <Footer
        setTodoStatus={setTodoStatus}
        todoLeft={filterItemLeft(arr).length}
      />
    </div>
  );
};


export default App;
