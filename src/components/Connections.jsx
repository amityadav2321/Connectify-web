import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import UserCard from './UserCard'

const Connections = () => {
    const connections=useSelector((store)=>store.connections)
    const dispatch=useDispatch();

    const fetchConnections=async()=>{
        try {
        const res= await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
        
        dispatch(addConnections(res?.data?.data));
        } catch (err) {
            
        }
        
    }

    useEffect(()=>{
        fetchConnections();

    },[]);

    if(!connections) return;

    if(connections.length===0) return <h1>No Connections Found</h1>

  return <div>
  
  <div className=' text-center my-10 '>
    <h1 className="text-2xl ">Connections</h1>
  </div>

  <div className="flex flex-wrap justify-center gap-6 px-4 mb-10">
  {connections.map((connection) => (
    <UserCard key={connection._id} user={connection} showActions={false} />
  ))}
</div>

    
  
  
  
  
  
  
  
  
  
  </div>
  
}

export default Connections