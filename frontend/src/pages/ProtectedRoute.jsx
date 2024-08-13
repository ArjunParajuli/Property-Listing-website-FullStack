import { Navigate, Outlet } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

const ProtectedRoute = ({}) => {
    const {user, userLoading} = useAppContext();

    if(userLoading) return; // if userLoading then we must return else we'll be sent to landing page

    return user ?  <Outlet /> : <Navigate to='/landing' />
}

export default ProtectedRoute