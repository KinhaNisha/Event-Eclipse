import express from 'express';
import UserController from '../Controller/UserController.js';

const userRoutes = express.Router();

userRoutes.route('/')
    .post(UserController.createUser)
    .get(UserController.getUsers);

userRoutes.route('/:id')
    .get(UserController.getUserById)
    .put(UserController.updateUserById)
    .delete(UserController.deleteUserById);

export default userRoutes;
