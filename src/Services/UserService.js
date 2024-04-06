import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config();

class UserService {
    hashPassword(password) {
        try {
            const saltRounds = process.env.SALT_ROUNDS;
            const hashedPassword = bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            throw new Error('Error hashing password');
        }
    }
}

export default new UserService();
