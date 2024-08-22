require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const transactionsRoutes = require('./routes/transactions');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    return res.send("hi everyone");
})

// Routes
app.use('/transactions', transactionsRoutes);


dbConnect();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });