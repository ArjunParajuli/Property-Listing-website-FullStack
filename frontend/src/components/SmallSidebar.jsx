import React from "react";
import Wrapper from "../wrappers/smallSidebar";
import logo from "../assets/images/logo.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppContext } from "../context/AppContext";
import links from "../utils/links.jsx";
import { NavLink } from "react-router-dom";

// this comp will be displayed only for small screens and if showSidebar is true then show-sidebar class will be applied and side bar will be displayed.
const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={`${
          showSidebar ? "show-sidebar sidebar-container" : "sidebar-container"
        } `}
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <IoIosCloseCircleOutline />
          </button>
          <header>
            <img
              src={logo}
              alt="jobify"
              className="logo"
              width={160}
              height={50}
            />
          </header>
          <div className="nav-links" >
            {links.map((link) => {
              return (
                <NavLink to={link.path} key={link.id} onClick={toggleSidebar} className={({isActive})=>isActive ? 'nav-link active' : 'nav-link'}>
                  <span className="icon">{link.icon}</span> {link.text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
