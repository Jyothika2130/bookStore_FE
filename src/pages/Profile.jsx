/* eslint-disable react-hooks/immutability */

import React, { useEffect, useState } from "react";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";

import { toast } from "react-toastify";
import { addBook, getUserDetails } from "../services/allApi";
import EditProfile from "../componenets/EditProfile";




const Profile = () => {
  const [sellBookFlag, setSellBookFlag] = useState(true);
  const [BookStatusFlag, setBookStatusFlag] = useState(false);
  const [purchaseTag, setpurchaseTag] = useState(false);
  const [preview, setPreview] = useState(
    "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"
  );
  const [previewArray, setPreviewArray] = useState([]);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    noOfPages: 0,
    imgUrl: "",
    price: 0,
    discountPrice: 0,
    abstract: "",
    publisher: "",
    language: "",
    ISBN: 0,
    category: "",
    uploadedImage:[],
  });
  useEffect(()=>{
 getUserData()
  },[])
   const [userDetails,setUserDetails]=useState({})
  const onImageClick = (e) => {
    console.log(e.target.files[0]);
    let imgUrl = URL.createObjectURL(e.target.files[0]);
    console.log(imgUrl);
    setPreview(imgUrl);
    setPreviewArray([...previewArray, imgUrl]);
    setBookData({
      ...bookData,
      uploadedImage: [...bookData.uploadedImage, e.target.files[0]],
    });
  };
  const onAddClick = async () => {
    try {
      let token = localStorage.getItem("token");
      let headers = {
        //Multipart form data is a way for a web form to send files and other information to a server
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      // formData is used to encode the file uploading ,if the request has file uploading we must pass the request body as FormData
      let reqBody = new FormData();
      for (let key in bookData) {
        console.log(bookData)
        console.log(key)
        if (key != "uploadedImage") {
          reqBody.append(key,bookData[key]);
        } else {
          bookData.uploadedImage.forEach((eachFile) => {
            reqBody.append("uploadedImages", eachFile);
          });
        }
      }
      console.log(reqBody)
      let apiResponse = await addBook(reqBody, headers);
      console.log(apiResponse);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const getUserData=async()=>{
    try {
      let  token=localStorage.getItem("token")
      let header={
        Authorization:`Bearer ${token}`
      }
      let apiResponse=await getUserDetails(header)
      console.log(apiResponse)
       if(apiResponse.status==200){
        setUserDetails(apiResponse.data)
       }
       else{
        toast.error("error")
       }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong while taking details of user')
    }
  }
  return (
    <div>
      <Header />
      <div className="w-full h-[30vh] bg-blue-950 relative">
        <div className="rounded-full w-52 h-52 left-[15%] bottom-0 transform -translate-x-1/2 translate-y-1/2 flex items-center justify-center text-white text-5xl bg-violet-500 absolute font-bold border-8 border-white">
          J
        </div>
      </div>
      <div className="container mx-auto px-4 mt-28">
        <div className="flex justify-between items-center">
          <p className="text-4xl text-black">Jyothika</p>
          
        
            <EditProfile userDetails={userDetails} />
          
           
        </div>
        <br />
        <br />
        <p className="text-justify mb-10 ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
          dignissimos nam voluptas, architecto totam voluptatem qui consequatur
          explicabo asperiores illum dolorem non sequi ipsam vero! Dolore cum
          aliquid amet recusandae? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Esse culpa ratione a voluptates natus magni eius
          consequuntur velit sint commodi ipsum fuga nulla, dignissimos officiis
          aut cum quos dolore alias.
        </p>
      </div>
      <div className="flex justify-center">
        <button
          className="border rounded-2xl p-2 m-2"
          onClick={() => {
            setSellBookFlag(true);
            setBookStatusFlag(false);
            setpurchaseTag(false);
          }}
        >
          Sell Book
        </button>
        <button
          className="border rounded-2xl p-2 m-2"
          onClick={() => {
            setSellBookFlag(false);
            setBookStatusFlag(true);
            setpurchaseTag(false);
          }}
        >
          Book Status
        </button>
        <button
          className="border rounded-2xl p-2 m-2"
          onClick={() => {
            setSellBookFlag(false);
            setBookStatusFlag(false);
            setpurchaseTag(true);
            
          }}
        >
          Purchase History
        </button>
      </div>
      {sellBookFlag && (
        <div className="mx-25 bg-gray-600 ">
          <h1 className="text-2xl text-center">Book Deails</h1>
          <div className="flex mx-96 gap-8">
            <div className="flex flex-col gap-2 p-1 container mx-auto">
              <input
                type="text"
                placeholder="title"
                className="text-grey mx-2 bg-amber-50 rounded p-1 "
                onChange={(e) =>
                  setBookData({ ...bookData, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Author"
                className="text-grey mx-2 bg-amber-50 rounded p-1"
                onChange={(e) =>
                  setBookData({ ...bookData, author: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Number of pages"
                className="text-grey mx-2 bg-amber-50 rounded p-1"
                onChange={(e) =>
                  setBookData({ ...bookData, noOfPages: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="image Url"
                className="text-grey mx-2 bg-amber-50 rounded p-1"
                onChange={(e) =>
                  setBookData({ ...bookData, imgUrl: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="price"
                className="text-grey mx-2 bg-amber-50 rounded p-1"
                onChange={(e) =>
                  setBookData({ ...bookData, price: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Discount Price"
                className="text-grey mx-2 bg-amber-50 rounded p-1"
                onChange={(e) =>
                  setBookData({ ...bookData, discountPrice: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Abstract"
                className="text-grey mx-2 bg-amber-50 rounded p-1"
                onChange={(e) =>
                  setBookData({ ...bookData, abstract: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 p-1 container mx-auto">
              <input
                type="text"
                placeholder="Publisher"
                className="text-grey mx-2 bg-amber-50 rounded p-1 "
                onChange={(e) =>
                  setBookData({ ...bookData, publisher: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Language"
                className="text-grey mx-2 bg-amber-50 rounded p-1"
                onChange={(e) =>
                  setBookData({ ...bookData, language: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="ISBN"
                className="text-grey mx-2 bg-amber-50 rounded p-1"
                onChange={(e) =>
                  setBookData({ ...bookData, ISBN: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Category"
                className="text-grey mx-2 bg-amber-50 rounded p-1"
                onChange={(e) =>
                  setBookData({ ...bookData, category: e.target.value })
                }
              />
              <label htmlFor="imgUpload">
                <input
                  type="file"
                  className="hidden"
                  id="imgUpload"
                  onChange={(e) => onImageClick(e)}
                />
                <img src={preview} alt="" className="w-25 mx-9 mt-1.5" />
              </label>
              {previewArray.length > 0 && (
                <div className="flex">
                  {previewArray.map((eachPreview) => (
                    <img
                      src={eachPreview}
                      alt=""
                      className="w-25 mx-9 mt-1.5"
                    />
                  ))}
                  {previewArray.length < 3 && (
                    <label htmlFor="plus">
                      <input
                        type="file"
                        className="hidden"
                        id="plus"
                        onChange={(e) => onImageClick(e)}
                      />
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/11527/11527831.png"
                        alt=""
                        className="w-25 mx-9 mt-1.5"
                      />
                    </label>
                  )}
                </div>
              )}
            </div>
            <button onClick={onAddClick}>Add</button>
          </div>
        </div>
      )}
      {BookStatusFlag && <div>Book status</div>}
      {purchaseTag && <div>Purchase</div>}
      <Footer />
    </div>
  );
};

export default Profile;
