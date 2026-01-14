import React from 'react'
import Header from './Header'

const PaymentFailure = () => {
  return (
    <>
     <Header />
        
        <h1 className='text-center text-2xl text-red-500'>Payment Failed </h1>
        <div className='mx-100 mt-8 '>
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ141_tFCG1ElFfJS3QhJTsaTogH1Ez159GYA&s" alt="" className='w-160'/>
        </div>
         
        </>
  )
}

export default PaymentFailure