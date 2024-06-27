import React from 'react'
import NotFound from '../assets/images/not-found.svg';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='h-100 w-[90vw] mx-auto'>
      
    <div className='d-flex flex-column justify-content-center align-items-center' style={{minHeight: '100vh'}}>
      <img src={NotFound} alt='not found' className='img' ></img>
      <h2>Ohh! Page Not Found</h2>
      <p>we can't seem to find the page you are looking for</p>
      <Link to='/' style={{textDecoration: 'none', fontWeight: 'bolder'}}>Back to Home</Link>
    </div>
    
    </div>
  )
}

export default Error