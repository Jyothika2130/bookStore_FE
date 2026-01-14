/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";
import { buyBook, getSingleBook } from "../services/allApi";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { baseURL } from "../services/baseURl";
import {loadStripe} from '@stripe/stripe-js';
import { toast } from "react-toastify";
import { authContext } from "../Context/AuthContext";



const SingleBook = () => {
  const {token}=useContext(authContext)
  console.log(token )
  const [bookData, setBookData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    try {
      // let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiresponse = await getSingleBook(id, header);
      console.log(apiresponse);
      if (apiresponse.status == 200) {
        console.log(apiresponse.data.singlBookdata);
        setBookData(apiresponse.data.singlBookdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
const onBuyClick = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const stripe = await loadStripe(
        "pk_test_51Sp9rDD7DuVkbsfUQn91Wkymnt2hw18o8iOcQUVfxGaLfUcj1WKYZWIPpiH6IBWdB7F58YeSyjlkuXgCiX9GgSkq00prZQ2X23z"
      );
      let reqbody = {
       
        bookId: bookData._id,                      
        bookName:bookData.title,
        bookDesc:bookData.abstract,
        bookImage:bookData.imgUrl,
        sellerMail:bookData.userMail,
        price:bookData.price,
        discountPrice: bookData.discountPrice,
      };
      let header = {
        Authorization: `Bearer ${token}`,
      };
    
      let apiResponse = await buyBook(reqbody,header);
      console.log(apiResponse)
       if(apiResponse.status==200){
        let session=apiResponse.data.session
        console.log(session)
        window.location.href=session.url;
       }else{
        toast.error(apiResponse.response.data.message)
       }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in payment");
    }
  };
  return (
    <>
      <Header />
      <div className="container  border-4">
       
        <div className="mx-30 border p-6 flex justify-around mt-10 w-70">
          <img src={bookData?.imgUrl} alt=" image" />
          <div className="mx-10 ">
            <div className="text-center font-bold">
              <h1>{bookData?.title}</h1>
            </div>
              <h4 className="p-3">{bookData?.abstract}</h4>

            <div className=" ">
              <h4>
                <span className="font-bold">Author: </span>
                {bookData?.author}
              </h4>
              <h4>
                <span className="font-bold">Publisher: </span>
                {bookData?.publisher}
              </h4>
            </div>
            <div className="flex gap-5">
              <h4>Price:{bookData?.price}</h4>
              <h4>DiscountPrice:{bookData?.discountPrice}</h4>
            </div>

            <div className="flex gap-5">
              <h4>Lang:{bookData?.language}</h4>
              <h4>Category:{bookData?.category}</h4>
              
            </div>

            <div className="flex gap-5">
              <h4>ISBN:{bookData?.ISBN}</h4>
              <h4>NoOfPages:{bookData?.noOfPages}</h4>
            
            </div>
          </div>

          <div>
            <button className="bg-green-700 p-2 border-2  "onClick={() => setOpenModal(true)}>More Images</button>
                <Modal className="mx-60" show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="bg-gray-600 text-white">Upload Images</ModalHeader>
        <ModalBody className="bg-gray-600">
          <div className="space-y-6 flex justify-around">
            {
              bookData?.uploadedImages?.map((eachImage)=>(
                
                <img src={`${baseURL}/uploads/${eachImage}`} alt="" className="w-75 " />
              ))
            }
          </div>
        </ModalBody>
        <ModalFooter className="bg-gray-600">
          <Button onClick={() => setOpenModal(false)} className="rounded bg-gray-950 text-amber-50 p-1 text-2xl">close</Button>
          
        </ModalFooter>
      </Modal>
            
            <div className="flex justify-around gap-4 mt-6">
              <Link className="bg-blue-700 p-2 text-amber-50" to={"/books"}>
                Go Back
              </Link>
              <button className="bg-green-700 p-2"onClick={onBuyClick}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleBook;
