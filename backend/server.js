const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Stock = require('./models/Stocks');

const app = express();
const PORT = 5000;

app.use(cors());
// app.use(express.json());


// Predefined stocks with initial prices
const stocksData = {
  AAPL: { price: getRandomPrice() },
  GOOGL: { price: getRandomPrice() },
  MSFT: { price: getRandomPrice() },
  AMZN: { price: getRandomPrice() },
};


// Generate random stock prices
function getRandomPrice() {
  return (Math.random() * 1000).toFixed(2); 
}

function updateStockPrices() {
  Object.keys(stocksData).forEach((stock) => {
    stocksData[stock].price = getRandomPrice();
  });
}

updateStockPrices();
//update generated random stock price in every 1 min
setInterval(updateStockPrices, 60000);

// Get the stock price for a specific stock
app.get('/api/stocks/:stock', (req, res) => {
  const { stock } = req.params;
  const stockData = stocksData[stock];
  // console.log(stockData);
  if (stockData) {
    res.json({ price: stockData.price });
  } else {
    res.status(404).json({ error: 'Stock not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
