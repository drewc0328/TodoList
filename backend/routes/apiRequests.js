// Defines the routes for our api requests
const express = require("express");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.post('/createUser', userController.createUser);

router.post('/createTask', userController.createTask);

module.exports = router;