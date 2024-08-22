import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./BarchartComponent.css";

const BarChartComponent = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/transactions/barchart', {
          params: { month }
        });
        const formattedData = Object.keys(response.data).map(key => ({
          priceRange: key,
          count: response.data[key]
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarChartData();
  }, [month]);

  return (
    <div className=' lg:w-1/2'>
      <h2>Bar Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priceRange" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
