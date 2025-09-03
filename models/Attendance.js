const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Attendance = sequelize.define('Attendance', {
  attendance_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  schedule_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('PRESENT','ABSENT','LATE'),
    allowNull: true
  },
  checked_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'attendance',
  timestamps: false
});

module.exports = Attendance;