
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Books from './pages/Books';
import Contact from './pages/Contact';
import Loader from './pages/Loader';
import Auth from './pages/Auth'
import PNF from './pages/PNF';
import { useState } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import Profile from './pages/Profile'
import SingleBook from './pages/SingleBook'
import AdminBooks from './Admin/pages/AdminBooks';
import AdminCareers from './Admin/pages/AdminCarrers';
import AdminHome from './Admin/pages/AdminHome';
import AdminSettings from './Admin/pages/AdminSettings';
import Careers from './pages/Carrers';
import PaymentSuccess from './componenets/PaymentSuccess';
import PaymentFailure from './componenets/PaymentFailure';


function App() {
const [showHome,setShowHome] =useState (false)
setTimeout(()=>{
  setShowHome(true)
},5000)
  return (
    <>
      <Routes>
        <Route path='/' element={showHome?<Home /> :<Loader />} />
        <Route path='/books' element={<Books />} />
        <Route path='/contact' element={<Contact />} />
       
        <Route path='/login' element={<Auth />}/>
        <Route path='/register' element={<Auth  insideRegister={true}/>}/>
       <Route path='/profile' element={<Profile />}/>
       <Route path='/view/:id/book' element={<SingleBook />}/>
       <Route path='/admin-home' element={<AdminHome />}/>
        <Route path='/admin-books' element={<AdminBooks />}/>
        <Route path='/admin-careers' element={<AdminCareers />}/>
        <Route path='/admin-settings' element= {<AdminSettings />}/>
        <Route path='/payment-success' element={<PaymentSuccess />}/>
        <Route path='/payment-failure' element={<PaymentFailure />}/>



             <Route path='/careers' element={<Careers />}/>
        <Route path='/*' element={<PNF />} />
      </Routes>
      <ToastContainer   
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Slide}
/>
    </>
  )
}

export default App;
  