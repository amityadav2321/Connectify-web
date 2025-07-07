import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import { AnimatePresence, motion } from 'framer-motion';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      // TODO: handle error
      console.error("Failed to fetch feed", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[80vh] pb-20">
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
    </div>
  );
};

export default Feed;