
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'

const Body = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const fetchUser=async()=>{
      try {
        
        const user=await axios.get(BASE_URL+"/profile/view",{
          withCredentials:true,
        })
        dispatch(addUser(user.data));
      } catch (err) {
        if(err.status===401){
          navigate("/login")
        }
        console.error(err);
      }
    }
    useEffect(()=>{
      fetchUser();
    },[])
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
