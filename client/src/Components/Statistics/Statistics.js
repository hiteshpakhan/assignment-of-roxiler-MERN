import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({ totalSale: 0, totalSoldItems: 0, totalUnsoldItems: 0 });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:8080/transactions/statistics', {
          params: { month }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [month]);

  return (
    <div className='block max-w-sm p-4  bg-blue-400 text-white rounded-lg shadow  lg:w-2/6 '>
      <h2 className='font-bold text-center p-4 text-xl'>Statistics</h2>
      <p className='font-bold text-start   p-4 text-xl'>Total Sales: ${stats.totalSale}</p>
      <p className='font-bold text-start   p-4 text-xl'>Total Sold Items: {stats.totalSoldItems}</p>
      <p className='font-bold text-start   p-4 text-xl'>Total Unsold Items: {stats.totalUnsoldItems}</p>
    </div>
  );
};

export default Statistics;
