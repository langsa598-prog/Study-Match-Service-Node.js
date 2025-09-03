const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Notification = sequelize.define('Notification', {
  notification_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('SCHEDULE','REQUEST','SYSTEM'),
    allowNull: true
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'notifications',
  timestamps: false
});

module.exports = Notification;