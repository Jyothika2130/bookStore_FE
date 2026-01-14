import React, { useContext, useState } from "react";
import styles from "../Auth.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { googleLoginApi, loginUser, regUser } from "../services/allApi";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { authContext } from "../Context/AuthContext";




const Auth = ({insideRegister}) => {
  const {saveToken}=useContext(authContext)
  const navigate=useNavigate()
  const [userData,setUserData]=useState({
    userName:"",
    password:"",
    email:""

  })
  const onRegisterClick=async()=>{
    try {
      if(userData.userName==""||userData.password==""||userData.email==""){
        toast.error('Please fill the form')
      }
      let apiResponse=await regUser(userData)
      if(apiResponse.status==201){
        toast.success('succesFully Added')
        navigate('/login')
      }
      else{
       toast.error(apiResponse.response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  const onLoginClick=async()=>{
    try {
      let reqBody={
        email:userData.email,
        password:userData.password
      }
      let apiResponse=await  loginUser(reqBody)
      console.log(apiResponse)
      if(apiResponse.status==200){
        toast.success('Login Success')
       saveToken(apiResponse.data.token)
       if(apiResponse.data.exisitingUser.userType=="admin"){
           navigate("/admin-home")
       }else
       {
        navigate("/")
       }
      }
      else{
        toast.error(apiResponse.response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("something went Wrong")
    }
  }
  const decodeFn=async(credentials)=>{
    console.log(credentials)
   let decodedData=jwtDecode(credentials.credential)
console.log(decodedData)
let payload={
  userName:decodedData.name,
  email:decodedData.email,
  proPic:decodedData.picture
}
let apiResponse=await googleLoginApi(payload)
 console.log(apiResponse)
 if(apiResponse.status==200 ||apiResponse.status==201){
  toast.success(apiResponse.data.message)
  localStorage.setItem('token',apiResponse.data.token)
 saveToken(apiResponse.data.token)
  navigate('/')
 }
 else{
  toast.error(apiResponse.response.data.message)
 }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.overlayWrapper}>
        <h1 className={styles.overlayHeading}>BOOK STORE</h1>
        <div className={styles.boxOverlay}>
          <div className={styles.iconWrapper}>
            <FaRegUserCircle className={styles.icon} />
          </div>
          
         
              <div className={styles.loginTitle}>
                {insideRegister?"Register":"Login"}
              </div>
              <div className={styles.loginForm}>
                {
                  insideRegister &&<input
                  type="text"
                  className={styles.inputField}
                  placeholder="username"
                  onChange={(e)=>setUserData({...userData,userName:e.target.value})}
                />
                }
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Email Id"
                   onChange={(e)=>setUserData({...userData,email:e.target.value})}
                />
                <input
                  type="password"
                  className={styles.inputField}
                  placeholder="password"
                onChange={(e)=>setUserData({...userData,password:e.target.value})}
                />
                <span className={styles.span1}>
                  Never share your password with others
                </span>
                <div>
                 {insideRegister ? <button className={styles.btn1}onClick={onRegisterClick}>Register</button>: <button className={styles.btn1} onClick={onLoginClick}>Login</button>}
                </div>
                <span>..................................................or.............................................</span>
            <GoogleLogin
  onSuccess={credentialResponse => {
   decodeFn(credentialResponse)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
                {insideRegister
                ?<div className={styles.register}>
                  <span>already an existing user</span>
                  <button>
                    <Link to="/login">login</Link>
                  </button>
                </div>:<div className={styles.register}>
                  <span>Are you already a user ?</span>
                  <button>
                    <Link to="/register">Register</Link>
                  </button>
                </div>}
              </div>
        
        
        </div>
      </div>
    </div>
  );
};

export default Auth;
