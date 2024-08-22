const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');



//for the entire table 
router.get('/list', async (req, res) => {
  // const { page = 1, limit = 10, search = '', month } = req.query;

  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const search = req.query.search || ""; 
  let month = req.query.month || ""; 

  // console.log(page, limit, search, month);

  try {
  // Parse the month input
  const monthNumber = new Date(Date.parse(month + " 1, 2023")).getMonth() + 1;
  
  // Create the search filter // you can also search through the description just have add this : // { description: new RegExp(search, 'i') }
  const searchFilter = search ? {
    $or: [
      { title: new RegExp(search, 'i') },
    ]
  } : {};

  // Filter for the selected month
  const monthFilter = month ? {
    $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
  } : {};

    const transactions = await Transaction.find({
      ...searchFilter,
      ...monthFilter
    })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

    const totalTransactions = await Transaction.countDocuments({
      ...searchFilter,
      ...monthFilter
    });

    res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: totalTransactions,
      transactions
    });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "error" });
  }
});



//for statistic
router.get('/statistics', async (req, res) => {
  const month = req.query.month || "March";

  const monthNumber = new Date(Date.parse(month + " 1, 2023")).getMonth() + 1;
  // console.log("monthNumber:" ,monthNumber, " - ddd - : ",new Date(Date.parse(month + " 1, 2023")));

  try {
    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
    });

    // console.log("all transactions: ",transactions);

    //if the item is sold then only add to sum
    const totalSale = transactions.reduce((sum, transaction) => transaction.sold ? sum + transaction.price : sum, 0);
    const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
    const totalUnsoldItems = transactions.length - totalSoldItems;

    res.json({
      totalSale,
      totalSoldItems,
      totalUnsoldItems
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//for barchart
router.get('/barchart', async (req, res) => {
  const  month  = req.query.month || "March";

  const monthNumber = new Date(Date.parse(month + " 1, 2023")).getMonth() + 1;

  try {
    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
    });

    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0
    };

    transactions.forEach(transaction => {
      const price = transaction.price;

      if (price <= 100) priceRanges["0-100"]++;
      else if (price <= 200) priceRanges["101-200"]++;
      else if (price <= 300) priceRanges["201-300"]++;
      else if (price <= 400) priceRanges["301-400"]++;
      else if (price <= 500) priceRanges["401-500"]++;
      else if (price <= 600) priceRanges["501-600"]++;
      else if (price <= 700) priceRanges["601-700"]++;
      else if (price <= 800) priceRanges["701-800"]++;
      else if (price <= 900) priceRanges["801-900"]++;
      else priceRanges["901-above"]++;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  
module.exports = router;


// for uploading the data from external api to database time
// function incertdata(){
  //     try {
  //       const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
  
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error(`Response status: ${response.status}`);
  //       }
  
  //       const data = await response.json();
  //       // console.log(data);
        
  //       // // Clear any existing data 
  //       // await Transaction.deleteMany({});

  //       // Insert data into the MongoDB database 1st time
  //       // await Transaction.insertMany(data);

    
  //       const newdata = data.map(item => {
  //         return {
  //           ...item,
  //           id: item.id + 60
  //         }
  //       });
  
  //       // Insert data into the MongoDB database 2nd time
  //       // await Transaction.insertMany(newdata);
  
  //     } catch (error) {
  //       console.log(error.message);
  //     }
// }
