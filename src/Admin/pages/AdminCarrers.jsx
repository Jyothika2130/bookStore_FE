import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSideBars from '../Components/AdminSideBar'
import { Card } from "flowbite-react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { addJob, deleteJob, getAllApplications, getJob } from '../../services/allApi';
import { toast } from 'react-toastify';
import { authContext } from '../../Context/AuthContext';
import { baseURL } from '../../services/baseURl';


const AdminCareers = () => {
  const {token}=useContext(authContext)
  const [showJobs,setShowJobs]=useState(true)
   const [showApplication,setShowApplication]=useState(false)
   const [openModal, setOpenModal] = useState(false);
   const [jobInputData,setJobInputdata]=useState({
    jobId:"",
    jobRole:"",
    jobDesc:"",
    publishedDate:"",
    lastDate:"",
    salary:"",
    experience:"",
   })
const [applydata,setApplydata]=useState([])
   useEffect(()=>{
  getAllJobs()
  getApplyData( )
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   const addJobClick=async()=>{
    try {
      let token=localStorage.getItem("token")
      let header={
        Authorization:`Bearer ${token}`
      }
      let apiresponse=await addJob(jobInputData,header)
      if(apiresponse.status==201){
        toast.success("Successfully added")
        getAllJobs()
      }
      else{
        toast.error(apiresponse.response.data.message)
      }
      setOpenModal(false)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
   }

   const getAllJobs=async()=>{
    try {
      let apiresponse=await getJob()
      console.log(apiresponse)
      if(apiresponse.status==200){
        setJobInputdata(apiresponse.data)
      }
      else{
        toast.error(apiresponse.response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while getting job deatils")
    }
   }
   const ondeleteClick=async(id)=>{
    try {
      // let token=localStorage.getItem("token")

      let header={
        Authorization:`Bearer ${token}`
      }
      let apiResponse=await deleteJob(id,header)
      if(apiResponse.status==200){
        toast.success("successfull deleted")
        getAllJobs()
      }
      else{
        toast.error(apiResponse.response.data.message
        )
      }
    } catch (error) {
      console.log(error)
      toast.error("Somethong went wrong while deleting")
    }
   }

     const getApplyData=async()=>{
              try {
                
                  let header={
            Authorization:`Bearer ${token}`,
          
          }

                let apiresponse=await getAllApplications(header)
                if(apiresponse.status==200){
                  setApplydata(apiresponse.data)
                 
                }
                else{
                  toast.error(apiresponse.response.data.message)
                }
                setOpenModal(false)
              } catch (error) {
                console.log(error)
                toast.error("Something went wrong")
              }
             }
  return (
    <>
        <AdminHeader />
        <div className='grid grid-cols-[3fr_9fr]'><AdminSideBars />
        <div>
<h1 className='text-center'>
Admin Carrers
</h1>
   <div className="text-center mt-2">
    <button className="bg-gray-600 border rounded p-1 text-white cursor-pointer"
    onClick={()=>{
      setShowJobs(true)
      setShowApplication(false)
    }}
    >View Jobs</button>
    <button className="bg-gray-600 border  rounded p-1 text-white cursor-pointer ms-2" 
      onClick={()=>{
      setShowJobs(false)
      setShowApplication(true)
    }}>View Applictions</button>
   </div>
   <div>
    {
      showJobs&& <div>
        <h1 className='text-center text-2xl font-bold mt-7'> Jobs</h1>
        <button className='bg-green-600 ms-2 border rounded p-2 text-white cursor-pointer'onClick={() => setOpenModal(true)}>Add new job</button>
        {
          jobInputData?.length>0 ? <div>
            {
              jobInputData?.map((eachJob)=>(

  <Card href="#" className="max-w-sm flex justify-between">
    <span>{eachJob.jobId}</span>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
        {eachJob.jobRole}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {eachJob.jobDesc}

      </p>
       <span>{eachJob.publishedDate}</span>
       <span>{eachJob.lastDate}</span>
       <span>{eachJob.salary}</span>
       <span>{eachJob.experience}</span>
       <button className='text-white bg-black  p-2 rounded-3xl outline-amber-100' onClick={()=>ondeleteClick(eachJob._id)}>Delete</button>
    </Card>
              ))
            }
          </div>:<h1>No jobs Added</h1>
        }
      </div>
    }
    {
      showApplication && <div> 

        {
          applydata?.length>0? <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Job Id</TableHeadCell>
            <TableHeadCell>Job ROle</TableHeadCell>
            <TableHeadCell>FullName</TableHeadCell>
            <TableHeadCell>email</TableHeadCell>
             <TableHeadCell>phone number</TableHeadCell>
             <TableHeadCell>resume</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
         {
          applydata.map((eachData)=>( <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 ">
             {
              eachData.jobId
             }
            </TableCell>
            <TableCell>{
              eachData.jobRole
             }</TableCell>
            <TableCell>{
              eachData.fullName
             }</TableCell>
            <TableCell>{
              eachData.phoneNumber
             }</TableCell>
             <TableCell>{
              eachData.email
             }</TableCell>
            <TableCell>
              <a href={`${baseURL}/uploads/${eachData.resume}`} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                download resume
              </a>
            </TableCell>
          </TableRow>
          ))
         }
         
        </TableBody>
      </Table>: <h1>No Application receieved</h1>
        }
      </div>
    }
   </div>
        </div>
        <Modal show={openModal} onClose={() => setOpenModal(false)} className='mx-90 '>
        <ModalHeader>Add new Job</ModalHeader>
        <ModalBody className='bg-gray-600'>
          <div className="space-y-6 flex justify-between">
               <div>
                 <input type="text" className='bg-white w-75 rounded-3xl mt-10 p-1'  placeholder='jobId'
                 onChange={(e)=>setJobInputdata({...jobInputData,jobId:e.target.value})}/>
                  <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl'placeholder='job role' 
                  onChange={(e)=>setJobInputdata({...jobInputData,jobRole:e.target.value})}/>
                   <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl' placeholder='job description'
                   onChange={(e)=>setJobInputdata({...jobInputData,jobDesc:e.target.value})}/>
                    <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl' placeholder='published date'
                    onChange={(e)=>setJobInputdata({...jobInputData,publishedDate:e.target.value})}/>
               </div>
               <div>
                 <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl' placeholder='last date'
                 onChange={(e)=>setJobInputdata({...jobInputData,lastDate:e.target.value})}/>
                  <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl' placeholder='salary'
                  onChange={(e)=>setJobInputdata({...jobInputData,salary:e.target.value})}/>
                   <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl' placeholder='experience'
                   onChange={(e)=>setJobInputdata({...jobInputData,experience:e.target.value})}/>
               </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal(false)} className='text-white bg-black  p-2 rounded-3xl outline-amber-100'>Close</Button>
          <Button  onClick={ addJobClick} className='text-white bg-green-700 ms-4 p-2 rounded-3xl outline-amber-100'>
            Add job
          </Button>
          </ModalFooter>
      </Modal> 
  </div>
    </>
  )
}

export default AdminCareers