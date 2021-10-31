const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var mongoDatabase = 'mongodb://localhost:27017/e-commerce';

const app = express();
mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('There is problem while connecting database ' + err) }
);

// All the express routes
const inventoryRoutes = require('./inventory');

// Conver incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 5001;

// Routes Configuration
app.use('/inventory', inventoryRoutes);

// Staring our express server
const server = app.listen(port,() => console.log(`server running at port: ${port}`));
