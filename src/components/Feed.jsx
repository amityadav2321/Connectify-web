import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import { AnimatePresence, motion } from 'framer-motion';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // ✅ new state for skeleton

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error('Failed to fetch feed', err);
    } finally {
      setLoading(false); // ✅ stop skeleton
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // ✨ Skeleton card
  const SkeletonCard = () => (
    <div className="w-80 h-[420px] bg-gray-800/50 border border-gray-700 rounded-2xl p-4 animate-pulse shadow-lg">
      <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3 mb-3"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2 mb-3"></div>
      <div className="flex gap-2 flex-wrap">
        <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
        <div className="h-6 w-14 bg-gray-700 rounded-full"></div>
      </div>
      <div className="mt-6 flex justify-between">
        <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
        <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col items-center min-h-[80vh] pb-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* ✨ Decorative gradient bars */}
      <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none"></div>
      <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none"></div>

      {/* 🏷️ Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-5 mb-4 drop-shadow-lg text-center z-10">
        Discover Amazing People
      </h1>
      <p className="text-gray-300 mb-7 text-center max-w-md px-4 z-10">
        Swipe through profiles,{" "}
        <span className="text-green-400 font-semibold">Connect</span> or{" "}
        <span className="text-red-400 font-semibold">Ignore</span>.
      </p>

      <div className="z-10">
        {loading ? (
          // ✅ Skeleton while loading
          <SkeletonCard />
        ) : (
          <AnimatePresence mode="wait">
            {feed?.users?.length > 0 ? (
              <motion.div
                key={feed.users[0]._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
              >
                <UserCard user={feed.users[0]} />
              </motion.div>
            ) : (
              <motion.div
                key="empty-feed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white text-center mt-10 text-lg"
              >
                No more users to show
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Feed;
