import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResourceManager = () => {
 const [resources, setResources] = useState([]);
 const [name, setName] = useState('');
 const [selectedResourceId, setSelectedResourceId] = useState(null);

 // Fetch resources on component mount
 useEffect(() => {
    fetchResources();
 }, []);

 // Function to fetch resources
 const fetchResources = async () => {
    const res = await axios.get('http://localhost:5000/resources');
    setResources(res.data);
 };

 // Function to add a new resource
 const addResource = async () => {
    const newResource = { name };
    const res = await axios.post('http://localhost:5000/resources', newResource);
    fetchResources();
    setName('');
 };

 // Function to update a resource
 const updateResource = async () => {
    const updatedResource = { name };
    const res = await axios.put(`http://localhost:5000/resources/${selectedResourceId}`, updatedResource);
    setSelectedResourceId(null);
    fetchResources();
    setName('');
 };

 // Function to delete a resource
 const deleteResource = async (id) => {
    await axios.delete(`http://localhost:5000/resources/${id}`);
    fetchResources();
 };

 return (
    <div>
      <h2>Resource Manager</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Resource Name"
      />
      {selectedResourceId ? (
        <button style={{margin:'5px'}} onClick={updateResource}>Update Resource</button>
      ) : (
        <button style={{margin:'5px'}} onClick={addResource}>Add Resource</button>
      )}
      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>
            {resource.name}
            <button style={{margin:'5px'}} onClick={() => {
              setSelectedResourceId(resource._id);
              setName(resource.name);
            }}>Edit</button>
            <button onClick={() => deleteResource(resource._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
 );
};

export default ResourceManager;
