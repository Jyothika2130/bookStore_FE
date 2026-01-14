import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { Link } from 'react-router-dom'
import { faHome } from '@fortawesome/free-regular-svg-icons'
import {faDashboard, faBook, faBriefcase, faGear } from '@fortawesome/free-solid-svg-icons'

const AdminSideBars = () => {
  return (
        <div style={{minHeight:'87vh'}} className='bg-gray-800'><h1 className='text-3xl font-bold text-white text-center'>Admin Dashboard <FontAwesomeIcon icon={faDashboard}/> </h1>
        <div className='border mt-20 text-center p-10'>
            <Link to={'/admin-home'} className='text-amber-100 font-bold'>Admin Home <FontAwesomeIcon icon={faHome}/></Link>
        </div>
        <div className='border mt-20 text-center p-10'>
            <Link to={'/admin-books'} className='text-amber-100 font-bold'>Admin Books/Users <FontAwesomeIcon icon={faBook}/></Link>
        </div>
        <div className='border mt-20 text-center p-10'>
            <Link to={'/admin-careers'} className='text-amber-100 font-bold'>Admin Careers <FontAwesomeIcon icon={faBriefcase}/></Link>
        </div>
        <div className='border mt-20 text-center p-10'>
            <Link to={'/admin-settings'} className='text-amber-100 font-bold'>Admin Settings <FontAwesomeIcon icon={faGear}/></Link>
        </div>
        </div>
      )
  
}

export default AdminSideBars