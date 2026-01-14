/* eslint-disable react-refresh/only-export-components */


import { createContext, useState } from "react";
   

export const authContext=createContext()
// create context 

//children defines app---> we will app with this provider
export const Authprovider=({children})=>{

    
    const [token,setToken]= useState(localStorage.getItem('token'))  

    const saveToken=(newToken)=>{
        localStorage.setItem("token",newToken)
        setToken(newToken)
    }
    const removeToken=()=>{
        localStorage.clear()
        setToken(null)
    }
 return (
    //this means we will wrap authProvider with App.jsx app can access yhe authContext ,which provides the values
    <authContext.Provider value={{token,saveToken,removeToken}}>
         {children}
    </authContext.Provider>
 )
}