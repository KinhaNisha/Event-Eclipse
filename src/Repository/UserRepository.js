import User from '../Model/UserModel.js';

class UserRepository {
  async findAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async createUser(name, email, password) {
    try {
      const user = await User.create({ name, email, password });
      return user;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw new Error('Error fetching user');
    }
  }

  async updateUserById(id, newData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.update(newData);
      return user;
    } catch (error) {
      throw new Error('Error updating user');
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return true;
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }

}

export default new UserRepository();
