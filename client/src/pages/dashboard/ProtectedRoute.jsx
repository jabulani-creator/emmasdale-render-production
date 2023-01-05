import { useAppContext } from "../../context/appContext";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading";
export const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();
  if (userLoading) return <Loading />;

  if (!user) {
    return <Navigate to="/register" />;
  }
  return children;
};
