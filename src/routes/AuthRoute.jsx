import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { currentUser } from "../redux/features/auth/authSlice";

const AuthRoute = ({ children }) => {
  const user = useSelector(currentUser);
  const location = useLocation();

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AuthRoute;
