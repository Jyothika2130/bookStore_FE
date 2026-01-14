/* eslint-disable react-hooks/immutability */

import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSideBars from '../Components/AdminSideBar'
import { getAllBook, getAllUsers } from '../../services/allApi'
import { toast } from 'react-toastify'
import { baseURL } from '../../services/baseURl'
import Card from "react-bootstrap/Card";

const AdminBooks = () => {
    const [showBooks,setShowBooks] = useState(true)
    const [showUsers,setShowUsers] = useState(false)
    const [bookData,setBookData] = useState([])
    const [userData,setUserData] = useState([])
    useEffect(()=>{
        getBookData()
        getUserData()
    },[])
    const getBookData = async()=>{
        try {
            let token = localStorage.getItem('token')
            let header = {
                Authorization:`Bearer ${token}`
            }
            let apiResponse = await getAllBook(header,"")
            console.log(apiResponse)
            if(apiResponse.status==200){
                setBookData(apiResponse.data.bookData)
            }else{
                toast.error(apiResponse.response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch book data")
        }
    }
    const getUserData = async()=>{
        try {
            let token = localStorage.getItem('token')
            let header = {
                Authorization:`Bearer ${token}`
            }
            let apiResponse = await getAllUsers(header)
            if(apiResponse.status==200){
                setUserData(apiResponse.data)
            }
            else{
                toast.error(apiResponse.response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch user data")
        }
    }
  return (
    
    <div>
        <AdminHeader />
        <div className='grid grid-cols-[3fr_9fr]'><AdminSideBars /><div>
            <div className='text-center mt-20'><button onClick={()=>{setShowBooks(true);
                setShowUsers(false)}} className='border p-2 bg-gray-200 text-blue-900 me-10 hover:bg-blue-950 hover:text-white cursor-pointer rounded'>Books</button><button onClick={()=>{setShowBooks(false);setShowUsers(true)}} className='border p-2 bg-gray-200 text-blue-900 me-10 hover:bg-green-950 hover:text-white cursor-pointer rounded'>Users</button></div>
            {
                showBooks && <div>
                {
                    bookData?.length>0?<div className='grid grid-cols-4 mt-10 mx-2'>
                        {
                            bookData?.map((eachBook)=>(
                                <div className='w-75'>
                                    <Card className='h-200' style={{width: "18rem" }}>
              <Card.Img variant="top" className='h-100 mb-3 w-full' src={eachBook.imgUrl} />
              <Card.Body>
                <Card.Title>{eachBook.title}</Card.Title>
                <Card.Text className='text-justify'>
                  {eachBook.Author} <br />
                </Card.Text>
              </Card.Body>
            </Card>
                                </div>
                            ))
                        }
                    </div>:<h1>No Books Added</h1>
            }
            </div>
            }
            {
                showUsers && <div>
                

                {
                    userData.length>0? <div className='grid grid-cols-3 gap-4 mt-10'>
                        {
                            userData?.map((eachUser)=>(
                                <div className='border bg-amber-500 p-4 '>
                                    <div>
                                        <img src={`${baseURL}/uploads/${eachUser.proPic}`} alt="" />
                                    </div>
                                    <h1>Name:{eachUser.userName}</h1>
                                <h1>Email:{eachUser.email}</h1>
                                <h1>Bio:{eachUser.bio}</h1>
                                </div>
                            ))
                        }
                    </div>:<h1>NO Users Found</h1>
                }
            </div>
            }
            
        </div></div>
        
    </div>
  )
}

export default AdminBooks