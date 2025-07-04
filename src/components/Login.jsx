import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {


  const [emailId,setEmailId]=useState("amit@gmail.com");
  const [password,setPassword ]=useState("Amit@123");
  const [error,setError]=useState();
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
      setError(err?.response?.data || "something went wrong")
      console.error(err);
     }
  };

  return (
    <div className='flex justify-center my-10 '>

        <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
        <h2 className="card-title justify-center">Login</h2>
        <div>
          <fieldset className="fieldset pt-2">
            <legend className="fieldset-legend">Email Id</legend>
            <input type="text" className="input" placeholder="Email Id" value={emailId} onChange={(e)=>setEmailId(e.target.value)} />
           
          </fieldset>
          <fieldset className="fieldset pt-2">
            <legend className="fieldset-legend pt-5">Password</legend>
            <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            
          </fieldset>
        </div>
        <p className='text-red-500'>{error}</p>
        <div className="card-actions justify-center ">
        <button className="btn btn-primary " onClick={handleLogin}>Login</button>
        </div>
        </div>
        </div>



    </div>
  )
}

export default Login;