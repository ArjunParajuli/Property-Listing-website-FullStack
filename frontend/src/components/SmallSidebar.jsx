import React from "react";
import Wrapper from "../wrappers/smallSidebar";
import logo from "../assets/images/logo.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppContext } from "../context/AppContext";
import NavLinks from "./NavLinks";

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
              alt="rent me"
              className="logo"
              width={160}
              height={50}
            />
          </header>
          
          <NavLinks toggleSidebar={toggleSidebar} />

        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
