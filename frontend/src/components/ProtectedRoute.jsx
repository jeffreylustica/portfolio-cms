import { useSelector } from "react-redux"
import { Navigate } from "react-router"

const ProtectedRoute = ({children}) => {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
  return isLoggedIn ? children : <Navigate to="/login" />
}

export default ProtectedRoute