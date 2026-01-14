
import React, { useEffect, useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateProfile } from "../services/allApi";

const EditProfile = ({ userDetails }) => {
  const [editData,setEditData] = useState({
    userName: "",
    password:"",
    confirmPassword:"",
    bio:"",
    proPic:""
  });
  useEffect(()=>{
    setEditData(userDetails)
  },[userDetails])
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
  );
  const onImageChange = (e) => {
    console.log(e.target.files[0]);
    let url = URL.createObjectURL(e.target.files[0]);
    setEditData({...editData,proPic:e.target.files[0]})
    console.log(url);
    setPreview(url);
  };
  const editClick=async()=>{
      try {
        if(editData.userName==""|| editData.password==""||editData.confirmPassword==""||editData.bio==""||editData.proPic==""){
        toast.error("Please fill th form")
        }else{
           if(editData.password==editData.confirmPassword){
     // api call
     let token=localStorage.getItem("token")
      let header={
        Authorization:`Bearer ${token}`,
        "Content-Type":"multipart/form-data",
      }
      let reqBody=new FormData()
      for(let key in editData){
        reqBody.append(key,editData[key])
      }
      let apiResponse=await updateProfile(editData._id,reqBody,header)
      console.log(apiResponse)
      if(apiResponse.status==200){
        toast.success(apiResponse.data.message)
      }
      else{
        toast.error(apiResponse.response.data.message)
      }
           }
           else{
         toast.error("recheck password")
           }
        }
      } catch (error) {
        console.log(error)
        toast.error("Something Went Wrong")
      }
  }
  return (
    <div>
      <FaEdit /> <button onClick={() => setOpenModal(true)}> Edit</button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="mx-60 "
      >
        <ModalHeader className="text-white bg-gray-600">Edit</ModalHeader>
        <ModalBody className="bg-gray-600">
          <div className="space-y-6 flex flex-col m-30 items-center ">
            <label htmlFor="inp">
              {" "}
              <input
                type="file"
                name=""
                id="inp"
                onChange={(e) => onImageChange(e)}
              />
              <img className="w-50" src={preview} alt="" />
            </label>
            <input
              type="text"
              placeholder="username"
              className="bg-white rounded border w-90"
              onChange={(e)=>setEditData({...editData,userName:e.target.value})}
              value={editData.userName}
            />
           
            <input
              type="text"
              placeholder="password"
              className="bg-white rounded border w-90"
              onChange={(e)=>setEditData({...editData,password:e.target.value})}
              value={editData.password}
            />
            <input
              type="text"
              placeholder="Confirm password"
              className="bg-white rounded border w-90"
              onChange={(e)=>setEditData({...editData,confirmPassword:e.target.value})}
            />
            <input
              name=""
              id=""
              placeholder="Bio"
              className="bg-white rounded border w-90"
              onChange={(e)=>setEditData({...editData,bio:e.target.value})}
              value={editData.bio}
            />
          </div>
        </ModalBody>
        <ModalFooter className="bg-gray-600">
          <Button
            onClick={() => setOpenModal(false)}
            className="bg-black text-white w-24"
          >
            Close
          </Button>
          <Button
            onClick={editClick}
            className="bg-black text-white w-24"
          >
            edit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditProfile;
