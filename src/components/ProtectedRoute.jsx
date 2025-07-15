import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  console.log(" ProtectedRoute -> user:", user);

  if (user === null) {
 
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden py-12 px-4">
      <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none" />
      <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none" />

     
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700 animate-pulse">
        <div className="h-8 bg-gray-700 rounded mb-6"></div>
        <div className="h-10 bg-gray-700 rounded mb-4"></div>
        <div className="h-10 bg-gray-700 rounded mb-4"></div>
        <div className="h-10 bg-gray-700 rounded mb-4"></div>
        <div className="h-10 bg-gray-700 rounded mb-6"></div>
        <div className="h-12 bg-gray-700 rounded mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}


  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
