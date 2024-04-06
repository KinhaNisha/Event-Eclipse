const User = require('../Model/UserModel.js');


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
      throw new Error(error.message);
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUserById(id, newData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(error.message);
      }
      await user.update(newData);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(error.message);
      }
      await user.destroy();
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

module.exports = new UserRepository();
