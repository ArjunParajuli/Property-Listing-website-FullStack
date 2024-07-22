import React from 'react'
import { Outlet } from 'react-router-dom'
import BigSidebar from '../../components/BigSidebar'
import SmallSidebar from '../../components/SmallSidebar'
import Navbar from '../../components/Navbar'
import Wrapper from '../../wrappers/sharedLayout'
import { useAppContext } from '../../context/AppContext'

const SharedLayout = () => {
  const {showSidebar} = useAppContext();
  return (
    <Wrapper>
        <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
    </Wrapper>
  )
}

export default SharedLayout