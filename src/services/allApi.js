import axiosConfig from "./axiosConfig"
import { baseURL } from "./baseURl"


export const regUser=async(reqBody)=>{
    return await axiosConfig("post",baseURL+"/RegisterUser",reqBody)
}
export const loginUser=async(reqBody)=>{
    return await axiosConfig("post",baseURL+"/loginUser",reqBody)
}
export const googleLoginApi=async(reqBody)=>{
    return await axiosConfig("post",baseURL+"/googleLogin",reqBody)
}
export const addBook=async(reqBody,reqHeader)=>{
    return await axiosConfig("post",baseURL
        +"/addBook",reqBody,reqHeader)
}
export const getlimitedBook=async()=>{
    return await axiosConfig("get",baseURL+'/getLimitedBooks',"")
}
export const getAllBook=async(reqHeader,searchKey)=>{
    return await axiosConfig('get',`${baseURL}/getAllBookData/?search=${searchKey}`," ",reqHeader)
}
export const getSingleBook=async(id,reqHeader)=>{
    return await axiosConfig('get',`${baseURL}/getSingleBookdata/${id}`,"",reqHeader)
}
export const getUserDetails=async(reqHeader)=>{
    return await axiosConfig('get',baseURL+"/userDetails","",reqHeader)
}
export const updateProfile=async(id,reqBody,reqheader)=>{
    return await axiosConfig("patch",`${baseURL}/${id}/updateProfile`,reqBody,reqheader)
}
export const getAllUsers = async(reqHeader)=>{
    return await axiosConfig('get',baseURL+'/getAllUsers',"",reqHeader)
}
export const addJob = async(reqBody,reqHeader)=>{
    return await axiosConfig('post',baseURL+'/addJob',reqBody,reqHeader)
}
export const getJob = async()=>{
    return await axiosConfig('get',baseURL+'/getAllJobs',"")
}
export const deleteJob = async(id,reqHeader)=>{
    return await axiosConfig('delete',`${baseURL}/${id}/deletJob`,{},reqHeader)
}
export const applyJob=async(reqBody,reqheader)=>{
    return await axiosConfig("post",baseURL+"/applyJob",reqBody,reqheader)
}
export const getAllApplications = async(reqHeader)=>{
    return await axiosConfig('get',baseURL+'/getAllApplication',"",reqHeader)
}
export const buyBook=async(reqbody,reqHeader)=>{
  return await axiosConfig("post",baseURL+"/buyBook",reqbody,reqHeader)
}