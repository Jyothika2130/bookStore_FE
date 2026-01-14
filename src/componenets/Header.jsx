/* eslint-disable react-hooks/set-state-in-effect */
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, DropdownItem } from "flowbite-react";
import { authContext } from '../Context/AuthContext';


const Header = () => {
  const {removeToken}=useContext(authContext)
  const [isLoggedIn, setIsLoggedIn]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    let token=localStorage.getItem('token')
    if(token){
      setIsLoggedIn(true)
    }
  },[])
  const onLogOutClick=()=>{
    // localStorage.clear()
    removeToken()
    navigate('/')

  }
  return (
    <>
    <div className='flex justify-between items-center'>
        <img className='w-25' src="https://images.rawpixel.com/image_png_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEyL3Jhd3BpeGVsb2ZmaWNlOV9yZXRyb19sb2dvX2Ffb3Blbl9ib29rX2JsYWNrX2FuZF93aGl0ZV9ub19zcGxhc180YjJlZGVmOC1lMWQwLTRiNzUtODhhMi1hZWY4N2JiZjlkN2IucG5n.png" alt="" />
        <h1 className='text-2xl font-bold'>Book Store</h1>
        <div className='flex'>
            <span><FontAwesomeIcon icon={faInstagram}/> </span>
            
            <span><FontAwesomeIcon icon={faTwitter}/></span>
            <span><FontAwesomeIcon icon={faFacebook}/></span>
            {
              isLoggedIn?<span><Dropdown label={
                <div>
                  <img src="https://www.shutterstock.com/image-vector/illustration-smiling-young-man-brown-600nw-2575185307.jpg" className='w-10' alt="" />
                </div>
              }
              className='text-black' dismissOnClick={false}>
                <div><Link to={"/profile"}>Profile</Link></div>
     
     <div><button onClick={onLogOutClick}>Logout</button></div>
    </Dropdown></span>:<Link to={'/register'} className='border rounded-3xl font-bold me-2 p-3 hover:bg-black hover:text-amber-50'>Login</Link>
            }
        </div>
        </div>
        <div className='bg-blue-950  w-full'>
            <div className=' text-cente r p-1.5 m-5 flex justify-center'>
               <Link to={'/'}><span className='text-white m-4 font-bold'>Home</span></Link> 
               <Link to={'/books'}><span className='text-white m-4 font-bold'>Book</span></Link> 
              <Link to={'/careers'}><span className='text-white m-4 font-bold'>Careers</span></Link> 
                <Link to={'/contact'}><span className='text-white m-4 font-bold'>Contact</span></Link> 
            </div>

             </div>
        </>
  )
}

export default Header