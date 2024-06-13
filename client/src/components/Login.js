import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const About  = ()=>{

  const {user , loginWithPopup , loginWithRedirect , isAuthenticated , logout ,isLoading} = useAuth0();

  console.log(user)
  if (isLoading) {
    return <div>Loading ...</div>;
  }
    return (

      <div >
        {isAuthenticated ?(<button
        onClick={(e)=>{
          logout()
        }}
        >Logout</button>)  :
        
        (<button onClick={(e)=>{
        loginWithRedirect()
       }} > Login </button>) }
       
        </div>

        
      
       
      );
}

export default About