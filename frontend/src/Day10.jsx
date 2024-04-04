import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios

const Day10 = () => {
 // Single state object for all form fields
 const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
 });
 const [dataSource, setDataSource] = useState([]);
 const [isLoading, setIsLoading] = useState(true);

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
 };

 useEffect( () => {
 fetchData();
 },[])

 const fetchData = async () => {
  try {
      const response = await axios.get(`http://localhost:5000/get/profile`);
      console.log(response.data); // Log the response to verify it's an array
      setDataSource(response.data);
      setIsLoading(false); // Set loading to false after data is fetched
  } catch (error) {
      console.log(error);
      setIsLoading(false); // Also set loading to false in case of error
  }
 };
 
 console.log(dataSource);

 const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting normally
    try {
      const payload = formData; // Use the formData state directly
      const response = await axios.post(`http://localhost:5000/post/profile`, payload);
      console.log(response.data); // Log the response or handle it as needed
    } catch (error) {
      console.error(error); // Handle error
    }
 };

 return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>User Profile</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>


      {isLoading ? (
      <p>Loading...</p>
    ) : (
      dataSource.map((profile, index) => (
        <div key={index}>
          <h1>User Profile {index + 1}</h1>
          <h3>Username : {profile.username}</h3>
          <h3>Email : {profile.email}</h3>
          <h3>Password : {profile.password}</h3>
        </div>
      ))
    )}

    </div>
 );
};

export default Day10;
