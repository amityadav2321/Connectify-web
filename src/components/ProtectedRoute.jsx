import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  console.log("🔐 ProtectedRoute -> user:", user);

  if (user === null) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
