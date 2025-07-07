
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'

const Body = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData = useSelector((store) => store.user);
    const fetchUser=async()=>{
      if(userData) return;
      try {
        
        const res=await axios.get(BASE_URL+"/profile/view",{
          withCredentials:true,
        })
        dispatch(addUser(res.data));
      } catch (err) {
        if(err.status === 401){
          navigate("/login")
        }
        
      }
    };
    useEffect(()=>{
      fetchUser();
    },[]);
  return (
   <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* This pushes Footer to bottom if content is short */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Body
