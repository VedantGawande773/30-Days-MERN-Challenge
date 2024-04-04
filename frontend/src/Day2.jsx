import React, { useState, useEffect } from 'react';

function DayII() {
const [data, setData] = useState([]);

  //by using simple javascript inbuild fetch API
  // useEffect(() => {
  //   fetchInfo();
  // }, []);

  // const fetchInfo = () => {
  //   return fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(res => (res.json()))
  //   .then(data => (setData(data))) 
  // }

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Data from Express Backend</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DayII;
