import React from 'react';

function UserProfile({ user }) {
  // Destructure user object for cleaner code
  const { name, email, avatarUrl } = user;

  return (
    <div className="user-profile">
      <img src={avatarUrl} alt="User Avatar" className="avatar" />
      <h2>{name}</h2>
      <p>{email}</p>
      {/* Add more profile information sections here as needed */}
    </div>
  );
}

export default UserProfile;