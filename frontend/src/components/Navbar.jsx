import React, { useState } from 'react'
import Wrapper from '../wrappers/navbar'
import { FaAlignJustify, FaRegUserCircle } from "react-icons/fa";
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const [profileClicked, setProfileClicked] = useState(false);
    const {user, toggleSidebar, logoutUser} = useAppContext();
  return (
    <Wrapper>
        <div className='nav-center'>
            <button className='toggle-btn' onClick={toggleSidebar}>
                <FaAlignJustify />
            </button>
        </div>

        <div>
            <h3 className='logo-text'>Dashboard</h3>
        </div>

        <div className='btn-container'>
            <button className='btn' onClick={()=>setProfileClicked(!profileClicked)}>
                {user.avatar ? <img src={user.avatar} alt="profile-pic" className='h-9 w-9 rounded-full' /> : <FaRegUserCircle className='h-6 w-6' />}
                {/* <FaRegUserCircle className='h-6 w-6' /> */}
            </button>
            <div className={profileClicked ? "dropdown show-dropdown" : "dropdown"}>
                <button className='dropdown-btn'>Profile</button>
                <button className='dropdown-btn' onClick={logoutUser}>Logout</button>
            </div>
        </div>
    </Wrapper>
  )
}

export default Navbar