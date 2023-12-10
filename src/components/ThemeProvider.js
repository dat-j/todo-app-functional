import React, { Children, createContext, useContext, useState } from 'react'
import App from '../App';

export const themeContext = createContext({
    theme:"light",
    toggleTheme: ()=>null
});
const ThemeProvider = () => {
    const [theme, setTheme]=useState("light");
   
    const toggleTheme = ()=>{
        // setTheme({theme:"light"?"dark":"light"})
        if(theme==="light"){
          setTheme("dark")
        }
        else{
          setTheme("light")
        }
    }
  return (
    <themeContext.Provider value={{theme, toggleTheme:toggleTheme}}>
        <App/>
    </themeContext.Provider>
  )
}

export default ThemeProvider