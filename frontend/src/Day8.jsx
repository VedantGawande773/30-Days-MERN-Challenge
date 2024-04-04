import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Day8 = () => {
 const [dataSource, setDataSource] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 5; // Number of items per page

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.restful-api.dev/objects');
        setDataSource(response.data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
 }, []);

 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = dataSource.slice(indexOfFirstItem, indexOfLastItem);

 const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
 };

 return (
    <div>
      {/* Render your data here */}
      {currentItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Pagination controls */}
      <div>
        <button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === Math.ceil(dataSource.length / itemsPerPage)}>Next</button>
      </div>
    </div>
 );
};

export default Day8;
