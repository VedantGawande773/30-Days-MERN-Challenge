import React, { useState } from 'react';
import axios from 'axios';

const Day3 = () => {
 const [resourceId, setResourceId] = useState(); // Initialize with a default value
 const [resourceName, setResourceName] = useState(''); // Initialize with an empty string

 const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/resources/', {
        id: resourceId,
        resource_name: resourceName,
      });
      console.log(response.data); 
      setResourceId('');
      setResourceName('');
    } catch (error) {
      console.log('Error submitting form:', error);
    }
 };

 return (
    <>
      <div>
        <h2>Enters Details to add in the backend</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="resourceId">Enter Resource Id </label>
          <div>
            <input
              type="number"
              name="resourceId"
              id="resourceId"
              value={resourceId}
              onChange={(e) => setResourceId(e.target.value)}
            />
          </div>
          <br />
          <label htmlFor="resourceName">Resource Name</label>
          <div>
            <input
              type="text"
              name="resource_name"
              id="resource_name"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
            />
          </div>
          <div>
            <button style={{ marginTop: '15px' }} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
 );
};

export default Day3;
