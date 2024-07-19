import React from 'react'
import Wrapper from '../wrappers/bigSidebar'
import logo from "../assets/images/logo.svg";
import { useAppContext } from "../context/AppContext";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
        <div
        className={`${
          showSidebar ? "show-sidebar sidebar-container" : "sidebar-container"
        } `}
      >
        <div className="content">
          <header>
            <img
              src={logo}
              alt="rent me"
              className="logo"
              width={160}
              height={50}
            />
          </header>
          
          <NavLinks />

        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar

