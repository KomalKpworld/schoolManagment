const express = require('express');
require('dotenv').config();
const {initializeExpress, handleRequests} = require("./express");
const app = express();

initializeExpress(app)
handleRequests(app)


