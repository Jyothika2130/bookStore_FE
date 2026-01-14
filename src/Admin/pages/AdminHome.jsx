/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../Components/AdminHeader";
import AdminSidebar from "../Components/AdminSideBar";
import { Card } from "flowbite-react";
import { getAllApplications, getAllBook, getAllUsers, getJob } from "../../services/allApi";
import { authContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";


const AdminHome = () => {
  const {token}=useContext(authContext)
  // eslint-disable-next-line no-unused-vars
  const [userData,setUserData] = useState([])
  const[totalUser,settotalUser]=useState(0)
  const[totalBooks,settotalBooks]=useState(0)
  const[totaljobs,settotalJobs]=useState(0)
  
    const [totalAppliction,settotalappliction]=useState(0)

  
  useEffect(()=>{
    findTotalUser(),
    findTotalBooks(),
    findTotalJobs(),
    findTotalPPlications()
  },[])
  const findTotalUser=async()=>{
    try {
    // let token = localStorage.getItem('token')
                let header = {
                    Authorization:`Bearer ${token}`
                }
                let apiResponse = await getAllUsers(header)
                console.log(apiResponse)
                if(apiResponse.status==200){
                    
                    settotalUser(apiResponse.data.length)
                }
                else{
                    toast.error(apiResponse.response.data.message)
                }
    } catch (error) {
      console.log(error)
    }
  }

  const findTotalBooks=async()=>{
    try {
    // let token = localStorage.getItem('token')
                let header = {
                    Authorization:`Bearer ${token}`
                }
                let apiResponse = await getAllBook(header,"")
                console.log(apiResponse)
                if(apiResponse.status==200){
                    
                    settotalBooks(apiResponse.data.bookData.length)
                }
                else{
                    toast.error(apiResponse.response.data.message)
                }
    } catch (error) {
      console.log(error)
    }
  }

   const findTotalJobs=async()=>{
    try {
    // let token = localStorage.getItem('token')
                let header = {
                    Authorization:`Bearer ${token}`
                }
                let apiResponse = await getJob(header)
                console.log(apiResponse)
                if(apiResponse.status==200){
                    
                    settotalJobs(apiResponse.data.length)
                }
                else{
                    toast.error(apiResponse.response.data.message)
                }
    } catch (error) {
      console.log(error)
    }
  }
  const findTotalPPlications=async()=>{
    try {
    // let token = localStorage.getItem('token')
                let header = {
                    Authorization:`Bearer ${token}`
                }
                let apiResponse = await getAllApplications(header)
                console.log(apiResponse)
                if(apiResponse.status==200){
                    
                    settotalappliction(apiResponse.data.length)
                }
                else{
                    toast.error(apiResponse.response.data.message)
                }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div> 
          <div className="flex justify-between  mt-3 mx-60  ">
            <div className="">
              <Card href="#" className="max-w-sm ">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Total Books
                </h5>
                
                 <span className="text-2xl text-amber-50">{totalBooks}</span>
              </Card>
            </div>

            <div>
              <Card href="#" className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  
                  Total Users
                </h5>
                <span className="text-2xl text-amber-50">{totalUser}</span>

              </Card>
            </div>

            <div>
              <Card href="#" className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Total Job Openings
                </h5>
                <span className="text-2xl text-amber-50">{totaljobs}</span>
              </Card>
            </div>
          </div>
          <div className="mt-5 mx-60">
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Applications
              </h5>
              <span className="text-2xl text-amber-50"> {totalAppliction}</span>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;