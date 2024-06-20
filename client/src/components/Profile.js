import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function UserProfile({ user }) {
  // Handle cases where user data might be unavailable or loading
  const { name, email, avatarUrl } = user || {}; // Use default values if user is null or undefined

  return (
    <div className="user-profile">
      <img src={avatarUrl} alt={name || 'User Avatar'} className="avatar" />
      <h2>{name}</h2>
      <p>{email}</p>
      {/* Add more profile information sections here as needed */}
    </div>
  );
}

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Handle cases where user is not authenticated (optional)
    return <div>Please authenticate to view your profile.</div>;
  }

  return (
    <UserProfile user={user} /> // Pass user data to UserProfile component
  );
}

export default Profile;