import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Day9 = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

const handleRegister = async (e) => {
 e.preventDefault();
 try {
    const payload = {
      username: userName,
      password: password,
    };
    const response = await axios.post(`http://localhost:5000/register`, payload);
    // Handle the response here, e.g., show a success message or redirect the user
 } catch (error) {
    console.log("Error Occurred", error.message);
    // Handle the error here, e.g., show an error message
 }
};

 const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: userName,
        password: password,
      };
      const response = await axios.post(`http://localhost:5000/login`, payload);
      // Store the token in local storage
      localStorage.setItem('token', response.data.token);
      // Optionally, redirect the user or show a success message
      console.log('Login successful');
    } catch (error) {
      console.log("Error Occurred", error.message);
      // Optionally, show an error message
    }
 };

const protectedRoute = async () => {
 try {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Include the token in the Authorization header
    const response = await axios.get(`http://localhost:5000/protected-route`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data);
 } catch (error) {
    console.error("Error fetching protected data:", error.message);
    // Optionally, handle the error here, e.g., show an error message
 }
};

 useEffect( () => {
 protectedRoute();
 },[])

  return (
    <>
    {/* Update Register or Login   */}
      <form onSubmit={handleLogin}>  
      <label>
        Username:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default Day9