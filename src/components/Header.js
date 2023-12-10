import React, {forwardRef, useImperativeHandle, useRef, useState} from "react"

const Header = React.forwardRef((props,ref) => {
  const {updateTodo, addTodo} = props
  const [text, setText]= useState("");
  const [tempId, setTempId]= useState(null);
  const inputRef = useRef(null);
  const handleChange = e => {
    setText(e.target.value)
   
  };
  const handleKeyDown = e =>{
    if(e.key==="Enter" && text && text.trim()){
      if(tempId){
        updateTodo(tempId, text);
        setTempId(null);
      }
      else{
        addTodo(e.target.value);
      }
      setText("");
    }
  };
  useImperativeHandle(
    ref, 
    () => ({
    editOnFocus(todoId, todoText){
      setText(todoText);
      inputRef.current.focus();
      setTempId(todoId);
    }  
  }));
    return (
      <div className=" flex">
        <input
          type="text"
          ref={inputRef}
          value={text}
          placeholder="What needs to be done?"
          className="h-10 w-2/3 mx-auto mb-1 my-10 text-center "
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
    );
})
export default Header