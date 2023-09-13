import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockPriceTracker = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [stockPrice, setStockPrice] = useState(null);

  const stockOptions = ['AAPL', 'GOOGL', 'MSFT', 'AMZN']; // Predefined list of stocks

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/stocks/${selectedStock}`);
        // console.log(response);
        setStockPrice(response.data.price);
      } catch (error) {
        console.error('Error fetching stock price:', error);
      }
    };

    // Fetch initial stock price
    if (selectedStock) {
      fetchStockPrice();

      // interval to fetch updated stock prices every minute
      const interval = setInterval(fetchStockPrice, 60000);

      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [selectedStock]);

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
    setStockPrice(null); // Clear previous stock price when selecting a new stock
  };

  return (
    <div className='bg-gray-400 min-h-screen py-12'>
      <div className='block max-w-sm max-h-sm bg-gray-300 border border-gray-200 rounded-lg shadow m-auto py-12'>
      <h1 className='text-center text-4xl mt-4 bg-gray-400'>Stock Price Tracker</h1>
      <label className=' text-center block mb-2 text-2xl text-gray-900 my-4'>Select a stock:</label>
      <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={selectedStock} onChange={handleStockChange}>
        <option value="">Select a stock</option>
        {stockOptions.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>
      {stockPrice !== null && (
        <div>
          <h2 className='text-center block mb-2 text-2xl text-gray-900 my-4'>Stock Price for {selectedStock}</h2>
          <p className='text-center block mb-2 text-2xl text-gray-900 my-4 bg-gray-200'>₹ {stockPrice}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default StockPriceTracker;
