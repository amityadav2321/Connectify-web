import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import { Link } from 'react-router-dom';

const UserCard = ({ user, showActions = true, showChat = false }) => {
  if (!user) return null; // ✅ safety check

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

  const dispatch = useDispatch();
  const [showAllSkills, setShowAllSkills] = useState(false);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  // Limit about text
  const truncatedAbout = about.length > 100 ? about.slice(0, 100) + "..." : about;
  const shownSkills = showAllSkills ? skills : skills.slice(0, 3);
  const remainingSkillCount = skills.length - 3;

  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-gray-900/80 text-white shadow-lg backdrop-blur-md border border-gray-700 rounded-xl p-4">
        {/* 📷 Profile Photo */}
        <div className="flex justify-center">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt="Profile"
            className="w-40 h-40 rounded-xl object-cover border-[2px] shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* 📝 Basic Info */}
        <h2 className="mt-4 text-xl font-semibold text-cyan-400 text-center">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-400 text-center">{age} years old, {gender}</p>
        )}
        {about && <p className="text-sm pt-2 text-gray-200 text-center">{truncatedAbout}</p>}

        {/* 🛠 Skills */}
        {skills.length > 0 && (
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

        {/* ✅ Action Buttons */}
        {showActions ? (
          <div className="flex justify-between gap-4 pt-4">
            <button
              className="btn btn-outline btn-success flex-1"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
            <button
              className="btn btn-outline btn-error flex-1"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
          </div>
        ) : (
          showChat && (
            <div className="flex justify-center pt-4">
              <Link
                to={`/chat/${_id}?name=${encodeURIComponent(firstName + " " + lastName)}&photo=${encodeURIComponent(photoUrl)}`}
                className="btn btn-outline btn-info flex-1"
              >
                Chat
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserCard;
