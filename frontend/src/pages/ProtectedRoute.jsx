import { Navigate, Outlet } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

const ProtectedRoute = ({}) => {
    const {user, userLoading} = useAppContext();

    if(userLoading) return;

    return user ?  <Outlet /> : <Navigate to='/landing' />
}

export default ProtectedRoute