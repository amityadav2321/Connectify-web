import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,age,about,gender,skills,photoUrl}=user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+lastName}</h2>
    {age && gender &&<p>{age+", "+gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center pt-3">
      <button className="btn btn-secondary mr-5 ">Interested</button>
      <button className="btn btn-primary">Ignore</button>
    </div>
  </div>
</div>
   
  )
}

export default UserCard;