import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
import UserCard from './UserCard';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="w-60 h-72 bg-gray-800/70 rounded-xl p-4 animate-pulse border border-gray-700">
      <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-3"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-6"></div>
      <div className="h-10 bg-gray-700 rounded w-full"></div>
    </div>
  );

  if (!connections && !loading) return null;

  if (!loading && connections.length === 0)
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Decorative bars */}
        <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none"></div>
        <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none"></div>

        <h1 className="text-2xl text-white">No Connections Found</h1>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden pb-10">
      
      <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none"></div>
      <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none"></div>

      <div className="text-center my-10 relative z-10">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          Connections
        </h1>
      </div>

      {/* Cards or Skeletons */}
      <div className="flex flex-wrap justify-center gap-6 px-4 mb-10 relative z-10">
        {loading
          ? // Show 6 skeletons while loading
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : // Show connections
            connections.map((connection) => (
              <UserCard key={connection._id} user={connection} showActions={false}  showChat={true}/>
            ))}
      </div>
    </div>
  );
};

export default Connections;
