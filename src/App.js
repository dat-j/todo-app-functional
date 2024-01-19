//import lib
import { useContext, useEffect, useRef, useState, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

//import css
import "./App.css";
//import function
import { todoAction } from "./components/function/todoReducer";

//import component
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Toggle from "./components/Toggle";
import Loading from "./components/loading/Loading";
import { themeContext } from "./components/ThemeProvider";
import TodolistTest from "./components/TodolistTest";
import store from "./store/store";

// ========================done import===============================
const App = () => {
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(false);
  const { theme } = useContext(themeContext);
  const headerRef = useRef(null);

  //get data from api
  useEffect(() => {
    axios
      .get("https://6588fac4324d4171525855f8.mockapi.io/api/todos")
      .then((res) => {
        store.dispatch({
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
    toast("DOne")
    console.log("store:", store.getState());
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

  return (
    <div className={"w-3/4 !h-[610px] bg-red-300 mx-auto " + theme}>
      <h1 className="text-center text-8xl text-rose-400 font-bold">TODOS</h1>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header ref={headerRef} />
      <Toggle toggleScroll={toggleScroll} />
      {loading ? (
        <Loading />
      ) : (
        <TodoList
          editTodoHeader={editTodoHeader}
          scroll={scroll}
        />
      )}
      <Footer />
      <button className="h-6 w-[100px] bg-red-400" onClick={check}>
        CHECK
      </button>
    </div>
  );
};

export default App;
