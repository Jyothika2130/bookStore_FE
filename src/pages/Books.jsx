 /* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Footer from "../componenets/Footer";
import { getAllBook } from "../services/allApi";
import { toast } from "react-toastify";
import Header from "../componenets/Header";
import { Link } from "react-router-dom";
import { authContext } from "../Context/AuthContext";




const Books = () => {
  const {token}=useContext(authContext)
  console.log(token)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [booksData,setBooksData]=useState([])
  const [duplicatebooksData,setduplicateBooksData]=useState([])
  const [categoryBooks,setCategoryBooks]=useState([])
  const [searchKey,setSearchKey]=useState(' ')
  useEffect(() => {
    // let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getBookData()
    }
  },[searchKey]);
  const getBookData=async()=>{
    try {
      let token=localStorage.getItem('token')
      let header={
        Authorization:`Bearer ${token}`
      }
      let apiResponse=await getAllBook(header,searchKey)
      console.log(apiResponse)
      if(apiResponse.status==200){
        setBooksData(apiResponse.data.bookData)
        setduplicateBooksData(apiResponse.data.bookData)
        let category=[]
        apiResponse.data.bookData.forEach((eachBooks)=>{
       if(!category.includes(eachBooks.category))  {
           category.push(eachBooks.category)   
       }  
        
        })
        
         setCategoryBooks(category)
         console.log(category)
      }
      else{
        toast.error(apiResponse.response.data.message)
      }
    }
     catch (error) {
      console.log(error)
    }
    
  }
  const filteredByCategory=(category)=>{
    let filterBooks=duplicatebooksData.filter((eachBooks)=>eachBooks.category==category)
    setBooksData(filterBooks)
  }
  return (
    <>
      <Header />
      {isLoggedIn ? (
        <>
          <div className="text-center">
            <h1 className="text-4xl">collection</h1>
            <div className="mt-2 ">
              <input type="text" placeholder="Search" className="p-2 rounded" onChange={(e)=>setSearchKey(e.target.value)} />
              <button className="ms-4 bg-blue-900 p-2 rounded">search</button>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_5fr]">
            <div className="mt-9 ms-6">
              <h1 className="text-2xl ms-3.5">filters</h1>
           <div onClick={getBookData}><input type="radio" id="inp" name="catogery" />
           <label htmlFor="inp">All</label></div>
           <div className="flex flex-col" >   {
                categoryBooks.map((eachCat)=>(
                  <div onClick={()=>filteredByCategory(eachCat)}>
                  <input type="radio" name="catogery"/>
                  <label> {eachCat}</label></div>
                ))
             
             }</div>
              
            </div>
           
           {
            booksData?.length>0? <div className="mt-9 grid grid-cols-3 gap-5">
             {
              booksData.map((eachBooks)=>( <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={eachBooks.imgUrl} />
                <Card.Body>
                  <Card.Title>{eachBooks.title}</Card.Title>
                  <Card.Text>
                    {eachBooks.abstract}
                  </Card.Text>
                  <Card.Text>
                    {eachBooks.price}
                  </Card.Text>
                  <Card.Text>
                    {eachBooks.ISBN}
                  </Card.Text>
                </Card.Body>
                <Link to={`/view/${eachBooks._id}/book`} className="bg-blue-600 text-amber-50 p-1">View More</Link>
              </Card>))
             }
            </div> : <h1> No BOOKs found</h1>
           }
            
          </div>
        </>
      ) : (
        <div className="flex justify-center mb-50">
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt=""
            className="w-40 "
          />
          <h2>Please </h2> <h2> Login</h2>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Books;