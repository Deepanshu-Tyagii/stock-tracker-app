const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/stock_prices', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("db connected");
}).catch(err => {
    console.log(err);
});

const stockSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
});

const Stock = mongoose.model('Stock', stockSchema);


module.exports = Stock;
