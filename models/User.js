const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('USER','ADMIN'),
    allowNull: true
  },
  interest_tags: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;