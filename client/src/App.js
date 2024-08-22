import React, { useState } from 'react';
import TransactionTable from './Components/TransactionTable/TransactionTable';
import Statistics from './Components/Statistics/Statistics';
import BarChartComponent from './Components/BarchartComponent/BarchartComponent';
import './App.css';
import About from './Components/About/About';

function App() {
  const [month, setMonth] = useState('March'); 

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className=''>
      <div className='p-5 text-lg font-bold bg-white border-gray-400 shadow-xl '> Roxiler MERN Stack Challange</div>

      <div className='m-5'>
        <span className=' text-lg pr-5 font-bold'>Select Your Month</span>
        {/* Month Dropdown */}
        <select value={month} onChange={handleMonthChange} className='text-white  bg-blue-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            .map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <TransactionTable month={month} />

      <div className=' w-full  content-center p-5 lg:flex lg:justify-around'>
        <BarChartComponent month={month} />
        

        <Statistics month={month} />
        
      </div>

      <About />
      
    </div>
  );
}

export default App;
