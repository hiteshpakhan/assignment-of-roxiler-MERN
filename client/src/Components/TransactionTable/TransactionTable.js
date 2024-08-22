import React, { useEffect, useState } from 'react';
import "./TransactionTable.css";
import axios from 'axios';

const TransactionTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/transactions/list', {
          params: { month, search, page }
        });
        setTransactions(response.data.transactions);
        setTotal(response.data.total);
        // console.log(transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [month, search, page]);

  return (
    <div className='p-5'>
      
      <span className=' text-lg pr-5 font-bold'>Search Bar </span>
      {/* Search Box */}
      <input
      className='w-2/3 lg:w-1/3 p-2 ps-10 text-sm text-gray-900 border border-gray-500 rounded-md bg-white focus:ring-blue-500 focus:ring-blue-300'
        type="text"
        value={search}
        placeholder="Search by title, description, or price"
        onChange={e => setSearch(e.target.value)}
      />

      <div className='overflow-auto border-b-2 rounded-lg pt-5'>

        {/* Transaction Table */}
        <table className='w-full'>
          <thead className='bg-gray-100 border-b-2 border-gray-200'>
            <tr>
              <th className=' p-3 text-sm font-semibold tracking-wide text-left min-w-60'>Title</th>
              <th className=' p-3 text-sm font-semibold tracking-wide text-left min-w-96'>Description</th>
              <th className=' p-3 text-sm font-semibold tracking-wide text-left min-w-14'>Price</th>
              <th className=' p-3 text-sm font-semibold tracking-wide text-left min-w-20'>Category</th>
              <th className=' p-3 text-sm font-semibold tracking-wide text-left min-w-20'>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className={`px-4 py-2 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}>
                <td className='p-3 text-sm text-gray-700'>{transaction.title}</td>
                <td className='p-3 text-sm text-gray-700'>{transaction.description}</td>
                <td className='p-3 text-sm text-gray-700'>{transaction.price}</td>
                <td className='p-3 text-sm text-gray-700'>{transaction.category}</td>
                <td className='p-3 text-sm text-gray-700'>{new Date(transaction.dateOfSale).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Pagination */}
      <button className=' font-bold p-3' disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
      <span className='p-2 bg-white border-b-2 rounded-md '>Page : {page}</span>
      <button className=' font-bold p-3' onClick={() => setPage(page + 1) }>Next</button>
      <span className='p-2 bg-white border-b-2 rounded-md '>Total this months data : {total}</span>
    </div>
  );
};

export default TransactionTable;
