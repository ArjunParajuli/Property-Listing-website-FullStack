import { useAppContext } from "../context/AppContext.jsx";
import links from "../utils/links.jsx";
import { NavLink } from "react-router-dom";

const NavLinks = ({toggleSidebar}) => {
  return (
    <div className="nav-links" >
            {links.map((link) => {
              return (
                <NavLink to={link.path} end key={link.id} onClick={toggleSidebar} className={({isActive})=>isActive ? 'nav-link active' : 'nav-link'}>
                  <span className="icon">{link.icon}</span> {link.text}
                </NavLink>
              );
            })}
          </div>
  )
}

export default NavLinks