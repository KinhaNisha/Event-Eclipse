import HttpStatus from '../Utils/httpStatusCode.js';
import Response from '../../domain/response.js';
import logger from '../Utils/Logger.js';
import UserRepository from '../Repository/UserRepository.js';
import User from '../Model/UserModel.js';

class UserController {
    async getUsers(req, res) {
        try {
            // Fetch all users from the database
            const users = await UserRepository.findAllUsers();

            // Log the action
            logger.info(`Fetching all users from the database`);
            console.log(users)

            // Send response with user details
            res.send(new Response(HttpStatus.SUCCESS, "successful", users));
        } catch (error) {
            // Handle errors
            logger.error(`Error fetching users: ${error.message}`);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong!", null));
        }
    }


    async createUser(req, res) {
        const { name, email, password } = req.body;
    
        logger.info(`User created successfully: ${name}`);
        try {
            const user = await UserRepository.createUser(name, email, password);
    
            logger.info(`User created successfully: ${user.name}`);
    
            res.send(new Response(HttpStatus.SUCCESS, 'User created successfully', user));
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'Could not create user', null));
        }
    }

    getUserById(req, res) {
        // Logic to get a user by ID
    }

    updateUserById(req, res) {
        // Logic to update a user by ID
    }

    deleteUserById(req, res) {
        // Logic to delete a user by ID
    }
}

export default new UserController();
