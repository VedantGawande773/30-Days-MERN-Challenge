import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
 const [usernames, setUsernames] = useState([]);
 const [usernameInput, setUsernameInput] = useState('');
 const [userDetails, setUserDetails] = useState(null);
 const [editMode, setEditMode] = useState(false);

 useEffect(() => {
    fetchUsernames();
 }, []);

 const fetchUsernames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get/profile');
      setUsernames(response.data);
    } catch (error) {
      console.error('Failed to fetch usernames:', error);
    }
 };

 const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get/profile/one?username=${usernameInput}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
 };

 const handleUsernameChange = (e) => {
    setUsernameInput(e.target.value);
 };

 const handleEditClick = () => {
    setEditMode(true);
 };

 const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/put/profile', {
        username: userDetails.username,
        updateProfile: {
          email: userDetails.email,
          password: userDetails.password, // Assuming you want to update the password as well
        },
      });
      setUserDetails(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
 };

 return (
    <div>
      <h2>Usernames</h2>
      <ul>
        {usernames.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
      <h2>User Details</h2>
      <input
        type="text"
        value={usernameInput}
        onChange={handleUsernameChange}
        placeholder="Enter username to fetch details"
      />
      <button onClick={fetchUserDetails}>Fetch Details</button>
      {userDetails && (
        <div>
          <h3>{userDetails.username}</h3>
          <p>Email: {userDetails.email}</p>
          {editMode ? (
            <form onSubmit={handleUpdateProfile}>
              <input
                type="email"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                placeholder="New email"
              />
              <input
                type="password"
                value={userDetails.password}
                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                placeholder="New password"
              />
              <button type="submit">Update Profile</button>
            </form>
          ) : (
            <button onClick={handleEditClick}>Edit Details</button>
          )}
        </div>
      )}
    </div>
 );
};

export default UserProfile;
