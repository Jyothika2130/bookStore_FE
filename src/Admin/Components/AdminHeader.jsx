import React from 'react'

const AdminHeader = () => {
  return (
    <>
        <div className='flex justify-between items-center bg-red-200'>
            <div className='flex justify-between items-center gap-2'>
                <img className='w-20' src="https://png.pngtree.com/png-vector/20240719/ourmid/pngtree-cartoon-of-luxembourg-holding-a-shopping-trolley-png-image_12975943.png" alt="" />
        <h1 className='text-2xl font-bold'>Book Store</h1>
            </div>
            <h1 className='text-2xl font-bold'>Welcome Admin</h1>
            <button className='border border-black p-2 rounded-2xl font-bold hover:bg-black hover:text-white m-2'>Logout</button>
        </div>
    </>
  )
}

export default AdminHeader