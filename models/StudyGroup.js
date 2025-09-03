const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const StudyGroup = sequelize.define('StudyGroup', {
  group_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  leader_id: {
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
  max_members: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  latitude: {
    type: DataTypes.DECIMAL(10,7),
    allowNull: true
  },
  longitude: {
    type: DataTypes.DECIMAL(10,7),
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
  tableName: 'study_groups',
  timestamps: false
});

module.exports = StudyGroup;