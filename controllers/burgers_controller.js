//Setting up the routes
const express = require("express");

const router = express.Router();
//Import the model (burger.js) to use its database functions
const burger = require("../models/burger.js");



//exports routes for the server.js to use
module.exports = router;