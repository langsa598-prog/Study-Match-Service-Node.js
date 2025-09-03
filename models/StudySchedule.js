const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const StudySchedule = sequelize.define('StudySchedule', {
  schedule_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  group_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'study_schedules',
  timestamps: false
});

module.exports = StudySchedule;