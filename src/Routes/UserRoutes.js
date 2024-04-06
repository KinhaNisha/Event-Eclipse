const express = require('express');
const UserController = require('../Controller/UserController.js');

const userRoutes = express.Router();

userRoutes.route('/')
    .post(UserController.createUser)
    .get(UserController.getUsers);

userRoutes.route('/:id')
    .get(UserController.getUserById)
    .put(UserController.updateUserById)
    .delete(UserController.deleteUserById);

module.exports = userRoutes;
