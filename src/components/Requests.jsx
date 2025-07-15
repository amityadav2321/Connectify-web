import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchedRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedRequest();
  }, []);

 
  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden flex justify-center items-start pt-16">
       
        <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none"></div>
        <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none"></div>

        <div className="w-full max-w-2xl space-y-4 px-4">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg w-full p-4 gap-4 backdrop-blur-md animate-pulse"
            >
              
              <div className="flex items-center gap-7">
                <div className="w-16 h-16 rounded-full bg-gray-700"></div>
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-700 rounded"></div>
                  <div className="w-24 h-3 bg-gray-700 rounded"></div>
                  <div className="w-40 h-3 bg-gray-700 rounded"></div>
                </div>
              </div>
              
              <div className="flex gap-4 pr-5">
                <div className="w-16 h-8 bg-gray-700 rounded"></div>
                <div className="w-16 h-8 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  //  If fetched but no data
  if (!requests) return null;
  if (requests.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none"></div>
        <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none"></div>
        <h1 className="text-2xl text-white">No Request Found</h1>
      </div>
    );
  }

  //  Final Render
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden pb-10">
      <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none"></div>
      <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none"></div>

      <div className="text-center my-10 relative z-10">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Requests</h1>
      </div>

      <div className="flex flex-col gap-4 items-center px-4 relative z-10">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
          return (
            <div
              key={_id}
              className="flex items-center justify-between bg-gray-800/80 border border-gray-700 rounded-xl shadow-lg w-full sm:w-[45rem] p-4 gap-4 backdrop-blur-md"
            >
              <div className="flex items-center gap-7">
                <img
                  src={photoUrl}
                  alt="photo"
                  className="w-16 h-16 rounded-full object-cover border border-gray-600"
                />
                <div>
                  <h2 className="font-semibold text-white text-base leading-tight">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-gray-400 text-sm">{age + ', ' + gender}</p>
                  )}
                  <p className="text-gray-300 text-sm truncate">
                    {about.length > 50 ? about.slice(0, 50) + '…' : about}
                  </p>
                </div>
              </div>

              <div className="flex gap-9 pr-5">
                <button
                  onClick={() => reviewRequest('accepted', request._id)}
                  className="px-4 py-2 text-sm rounded-md border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => reviewRequest('rejected', request._id)}
                  className="px-4 py-2 text-sm rounded-md border border-red-500 text-red-400 hover:bg-red-500 hover:text-black transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
