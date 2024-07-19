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
        <main className='dashboard'>
          {
            showSidebar && (
              <>
              <BigSidebar />
              <SmallSidebar />
              </>
            )
          }

        <Navbar />

        <div className='dashboard-page'> 
        <Outlet />
        </div>
        </main>
    </Wrapper>
  )
}

export default SharedLayout