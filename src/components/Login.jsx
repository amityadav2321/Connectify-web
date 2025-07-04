import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {


  const [emailId,setEmailId]=useState("amit@gmail.com");
  const [password,setPassword ]=useState("Amit@123");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogin=async()=>{
     try{
          const res = await axios.post(BASE_URL+"/login",{
        emailId,
        password,
      },{withCredentials:true});
      
      dispatch(addUser(res.data));
       return navigate("/")
     } 
     catch(err){
      console.error(err);
     }
  };

  return (
    <div className='flex justify-center my-10 '>

        <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
        <h2 className="card-title justify-center">Login</h2>
        <div className='justify-center px-3'>
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input className="input validator " value={emailId} onChange={(e)=>setEmailId(e.target.value)} type="email" required placeholder="email@gmail.com" />
            
            </fieldset>
            <fieldset className="fieldset">
            <legend className="fieldset-legend pt-5">Password</legend>
            <input type="password" value={password} className="input validator" onChange={(e)=>setPassword(e.target.value)} required placeholder="Password" minLength="8" />
            </fieldset>
        </div>
        <div className="card-actions justify-center pt-5">
        <button className="btn btn-primary " onClick={handleLogin}>Login</button>
        </div>
        </div>
        </div>



    </div>
  )
}

export default Login;