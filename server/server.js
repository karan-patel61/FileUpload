const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(require("./routes/uploads"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
 //My change made on this line
});
// app.get('/', (req, res) => { res.send('Hello from Express!'+" On Port: "+port)});
app.use(express.static(path.join(__dirname, '../client')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client')) 
});