import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("Redux User State:", user);
  }, [user]);

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-base-300/70 backdrop-blur-sm shadow-sm" : "bg-base-300"
      }`}
    >
      <div className="navbar justify-between">
        
        <div className="flex items-center px-9">
          <Link to="/" className="flex items-center gap-4 text-xl font-bold ">
            <img src="/Logo.png" alt="logo" className="w-8 h-8 rounded-full" />
            Connectify
          </Link>
        </div>

        
        {user?.firstName && (
          <div className="flex gap-1 items-center px-4">
            <div className="form-control pt-2.">Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end mx-5 flex">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    key={user?.photoUrl}
                    src={user?.photoUrl || "/user-profile.png"}
                    onError={(e) => (e.target.src = "/user-profile.png")}
                    alt="user photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to="/">Feed</Link></li>
                <li><Link to="/connections">Connections</Link></li>
                <li><Link to="/requests">Requests</Link></li>
                <li><Link to="/changepasword">Change Password</Link></li>
                <li><a onClick={handleLogOut}>Logout</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
