import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const requests=useSelector((store)=>store.requests)
    const dispatch=useDispatch();

    const reviewRequest=async(status,_id)=>{
        try {
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
            dispatch(removeRequest(_id));
        } catch (err) {
            
        }
    }

    const fetchedRequest=async()=>{

        try {

            const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
            dispatch(addRequest(res?.data?.data))
           




            
        } catch (err) {
            
        }
    }


useEffect(()=>{
    fetchedRequest();
},[])

  if(!requests) return;

    if(requests.length===0) return <h1 className='flex justify-center my-10 text-2xl'>No Request Found</h1>

  return (
    <div className=' text-center my-10'>
        <h1 className="text-3xl text-bold text-white ">Requests</h1>

        {requests.map((request)=>{
            const {_id,firstName,lastName,photoUrl,age,gender,about }=request.fromUserId;

            return(
                <div>
                <div key={_id} className='rounded-lg bg-base-300 w-2/4 mx-auto flex  m-5 p-3 justify-center items-center'>
                    <div>
                        <img src={photoUrl} alt="photo" className='w-20 h-20 rounded-full' />
                    </div>
                    <div className='text-left mx-10'>
                        <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                        {age && gender && <p>{age+", "+ gender}</p>}
                        <p>{about.length > 50 ? about.slice(0, 50) + '...' : about}</p>


                    </div>

                    <div className='flex'>
                        <button className="btn btn-outline btn-success mr-6 " onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                        <button className="btn btn-outline btn-error " onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                    </div>  
                    
                </div>
                        
                </div>
                
            )
        })}
    </div>
  )
}

export default Requests;