const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database.js');


class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    tableName: 'Users',
  }
);

sequelize.sync().then(() => {
  console.log('Users table created successfully!');
}).catch((error) => {
  console.error('Table already exists : ', error);
});

module.exports = User;
