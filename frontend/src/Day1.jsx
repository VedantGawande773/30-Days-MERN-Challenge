import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchResourceById = () => {
  const [resourceId, setResourceId] = useState('');
  const [resource, setResource] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setResourceId(e.target.value);
  };

  const fetchResource = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/resources/${resourceId}`);
      console.log(response);
      setResource(response.data);
      setError(null);
    } catch (error) {
      setError('Resource not found');
      setResource(null);
    }
  };

  return (
    <div>
      <h2>Fetch Resource By ID</h2>
      <input
        type="text"
        placeholder="Enter Resource ID"
        value={resourceId}
        onChange={handleInputChange}
      />
      <button onClick={fetchResource}>Fetch Resource</button>
      
      {error && <p>Error: {error}</p>}
      
      {resource && (
        <div>
          <h3>Resource Details</h3>
          <p>ID: {resource.id}</p>
          <p>Name: {resource.name}</p>
        </div>
      )}
    </div>
  );
};

export default FetchResourceById;
