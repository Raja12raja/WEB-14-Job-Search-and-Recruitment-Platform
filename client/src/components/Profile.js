import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";


function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
console.log(user)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(isAuthenticated==false)
    {
      return(
        <div>Please Login First</div>
      )
    }

    return (
      isAuthenticated && (
        <div className=" ">
          <div className="flex justify-center">
          <img src={user.picture} alt={user.name} className=" "/>
          </div>
         
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {console.log(user)}
        </div>
      )
      );
}
export default Profile;