const express = require('express');
const mongoose = require ('./db/db');
const nodemon = require('nodemon');
const app = express();
const PORT = 3000;
const API_URL = require('./api');
app.use(API_URL);
app.listen(PORT,()=> console.log(`Server has been...${PORT}`));


