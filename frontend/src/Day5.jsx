import React, { useEffect, useState } from 'react';
import axios from "axios";

const Day5 = () => {
 const [resources, setResources] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null); 
 const [name, setName] = useState(''); 

 useEffect(() => {
    fetchData();
 }, []);

 const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/resources");
      setTimeout(() => {
        setResources(response.data);
        setLoading(false);
        console.log(response.data);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
      setError(error.message);
    }
 };

 const handleSubmit = async (event) => { 
    event.preventDefault(); 
    try {
      const payload = { name };
      await axios.post('http://localhost:5000/resources', payload);
      fetchData();
      setName('');
    } catch (error) {
      setError(error.message);
    }
 };

 return (
    <>
      <h1>The Resource Manager</h1>
      {loading ? <h1>...Loading</h1> : null}
      {error && <h1>{error}</h1>}
      {resources.map((resource, index) => (
        <h3 key={index}>{resource.name}</h3>
      ))}

      <form onSubmit={handleSubmit}> {}
        <input type="text" 
               name="name"
               id="id"
               placeholder='Enter Resource Name'
               value={name}
               onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button> 
      </form>
    </>
 );
};

export default Day5;
