const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

class UserService {
    hashPassword(password) {
        try {
            const saltRounds = process.env.SALT_ROUNDS;
            const hashedPassword = bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new UserService();
