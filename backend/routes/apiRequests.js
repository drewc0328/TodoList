// Defines the routes for our api requests
const express = require("express");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.post('/createUser', userController.createUser);

router.post('/createTask', userController.createTask);

router.post('/login', userController.login);

router.delete('/deleteUser', userController.deleteUser);

router.delete("/deleteTask", userController.deleteTask);

router.post("/checkTask", userController.checkTask);

router.get("/getUser/:id", userController.getUser);

router.patch("/editTask", userController.editTask);

module.exports = router;