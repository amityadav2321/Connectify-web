import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ user ,showActions=true}) => {
  const {
    _id,
    firstName,
    lastName,
    age,
    about = "",
    gender,
    skills = [],
    photoUrl
  } = user;

  const dispatch=useDispatch();

  const [showAllSkills, setShowAllSkills] = useState(false);

  const handleSendRequest=async(status,userId)=>{
     try {
      const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
      dispatch(removeFeed(userId));
    }catch(err){

      }
  }
  // Limit about text to ~100 characters
  const truncatedAbout =
    about.length > 100 ? `${about.slice(0, 100)}...` : about;

  const shownSkills = showAllSkills ? skills : skills.slice(0, 3);
  const remainingSkillCount = skills.length - 3;

  return (<div className='justify-center'>
    <div className="card w-96 bg-gray-900/80 text-white shadow-lg backdrop-blur-md border border-gray-700 rounded-xl">
      <figure className="flex justify-center pt-6">
        <img
          src={photoUrl  || "/default-avatar.png"}
          alt="Profile"
          className="w-40 h-40 rounded-xl object-cover border-[2px] shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-cyan-400">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm text-gray-400">
            {age} years old, {gender}
          </p>
        )}

          {about && (
          <p className="text-sm pt-2 text-white min-h-[48px]">{truncatedAbout}</p>
          )}


        {Array.isArray(skills) && skills.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-400 mb-1">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {shownSkills.map((skill, index) => (
                <span
                  key={index}
                  className="badge bg-gray-800 text-fuchsia-300 px-3 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
              {!showAllSkills && remainingSkillCount > 0 && (
                <span
                  className="badge bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-gray-600"
                  onClick={() => setShowAllSkills(true)}
                  title="Click to show all skills"
                >
                  +{remainingSkillCount} more
                </span>
              )}
            </div>
          </div>
        )}

        {showActions&&(<div className="flex justify-between gap-4 pt-4">
          <button className="btn btn-outline btn-success flex-1" onClick={()=>handleSendRequest("interested",_id)}>
            Interested
          </button>
          <button className="btn btn-outline btn-error flex-1" onClick={()=>handleSendRequest("ignored",_id)}>
            Ignore
          </button>
        </div>)}
      </div>
    </div>
    </div>
  );
};

export default UserCard;
