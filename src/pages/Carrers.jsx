/* eslint-disable react-hooks/immutability */                                                                                                                                                         import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Card } from "flowbite-react";
import { applyJob, getJob } from "../services/allApi";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

const Careers = () => {
    
    const [jobData,setJobData] = useState([])
   const  [openModal, setOpenModal] = useState(false);
    const [jobInputData,setJobInputdata]=useState({
       jobId:"",
       jobRole:"",
       fullName:"",
       email:"",
       phoneNumber:"",
       resume:""
      })
    useEffect(()=>{
        getJobData()
      },[])
    const getJobData = async ()=>{
        try {
          let apiResponse = await getJob()
          console.log(apiResponse)
          if(apiResponse.status==200){
              setJobData(apiResponse.data)
          }
          else{
            toast.error(apiResponse.response.data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error("Something went wrong")
    
        }
      }
      const jobApply=async()=>{
          try {
            let token=localStorage.getItem("token")
              let header={
        Authorization:`Bearer ${token}`,
        "Content-Type":"multipart/form-data",
      }
      let reqBody=new FormData()
      for(let key in jobInputData){
        reqBody.append(key,jobInputData[key])
      }
            let apiresponse=await applyJob(reqBody,header)
            if(apiresponse.status==201){
              toast.success("Successfully added")
             
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
    <div>
        <Header />
        <div>
                      <h1 className="text-center mt-7 text-2xl font-bold">All Jobs</h1>
                      
                      <div>
                        {
                            jobData?.length>0?<div>
                              {
                                jobData.map((eachJob)=>(
        <Card href="#" className="max-w-sm">
          
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-dark">
               jobId:{eachJob.jobID}||jobRole:{eachJob.jobRole}||jobSalary:{eachJob.salary}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
               {eachJob.jobDesc}
              </p>
           <button onClick={() => {
           setJobInputdata({...jobInputData,jobId:eachJob.jobId,jobRole:eachJob.jobRole})
           setOpenModal(true)} }
            
           className='bg-green-600 ms-2 border rounded p-2 text-white cursor-pointer'>Apply now</button>
                
            </Card>
                                ))
                              }
                            </div>:<h1>no jobs added</h1>
                          }
                      </div>
        
                    </div>
                        <Modal show={openModal} onClose={() => setOpenModal(false)} className='mx-90 '>
        <ModalHeader>APPLY</ModalHeader>
        <ModalBody className='bg-gray-600'>
           <div className="space-y-6 flex justify-between">
               <div>
                 <input type="text" className='bg-white w-75 rounded-3xl mt-10 p-1'  placeholder='Fullname'
                 onChange={(e)=>setJobInputdata({...jobInputData,fullName:e.target.value})}/>
                  <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl'placeholder='phoneNumber' 
                  onChange={(e)=>setJobInputdata({...jobInputData,phoneNumber:e.target.value})}/>
                   <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl' placeholder='email'
                   onChange={(e)=>setJobInputdata({...jobInputData,email:e.target.value})}/>
                   
               </div>
               <div>

<label htmlFor="inp">Resume:-</label>
<input type="file" id="inp" name="inp" className='bg-white w-75 mt-10 p-1 rounded-3xl' onChange={(e)=>setJobInputdata({...jobInputData,resume:e.target.files[0]})}/>

                 {/* <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl' placeholder='last date'
                 onChange={(e)=>setJobInputdata({...jobInputData,lastDate:e.target.value})}/>
                  <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl' placeholder='salary'
                  onChange={(e)=>setJobInputdata({...jobInputData,salary:e.target.value})}/>
                   <input type="text" className='bg-white w-75 mt-10 p-1 rounded-3xl' placeholder='experience'
                   onChange={(e)=>setJobInputdata({...jobInputData,experience:e.target.value})}/> */}
               </div>
          </div>
        </ModalBody>
        <ModalFooter>
           <Button onClick={() => setOpenModal(false)} className='text-white bg-black  p-2 rounded-3xl outline-amber-100'>Close</Button>
                    <Button  onClick={jobApply } className='text-white bg-green-700 ms-4 p-2 rounded-3xl outline-amber-100'>
                      apply
                    </Button>
        </ModalFooter>
      </Modal>
                    <Footer />
    </div>
  )
}

export default Careers