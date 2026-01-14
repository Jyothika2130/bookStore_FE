import React from "react";
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
const Footer = () => {
  return (
    <>
  
      <div className="bg-blue-950 text-white w-full p-10 md:p-14">
        <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10">
          
     
          <div className="w-1/3">
            <h1 className="text-xl font-semibold mb-3 text-amber-400">About Us</h1>
            <p className="text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Consequatur similique velit! Ad ut in incidunt ab sequi. 
              Voluptates perspiciatis ullam incidunt reiciendis autem 
              assumenda eligendi itaque debitis eum reprehenderit fugit.
            </p>
          </div>

   
          <div className="w-1/3">
            <h1 className="text-xl font-semibold mb-3 text-amber-400">Newsletter</h1>
            <p className="text-gray-200 mb-3">Stay updated with your latest trends</p>
            <input
              type="email"
              placeholder="Email ID"
              className=" p-2 rounded outline-none text-black bg-amber-50"
            />
           
          </div>

      
          <div className="md:w-1/3">
            <h1 className="text-xl font-semibold mb-3 text-amber-400">Follow Us</h1>
            <p className="text-gray-200">Let us be social</p>
            <div className="flex gap-2 mt-4 text-2xl">
              <i className="fa-brands fa-facebook cursor-pointer"><FontAwesomeIcon icon={faFacebook}/></i>
              <i className="fa-brands fa-instagram cursor-pointer"><FontAwesomeIcon icon={faInstagram}/></i>
              <i className="fa-brands fa-twitter cursor-pointer"><FontAwesomeIcon icon={faTwitter}/></i>
              <i className="fa-brands fa-linkedin cursor-pointer"><FontAwesomeIcon icon={faLinkedinIn}/></i>
            </div>
          </div>

        </div>
      </div>

   
      <div className="bg-blue-900 text-center text-gray-200 p-3 text-sm">
        Copyright © 2023 All rights reserved | This website is made with by 💛 Amiya kiran
      </div>
    </>
  );
};

export default Footer
