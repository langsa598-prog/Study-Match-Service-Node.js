const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const GroupMember = sequelize.define('GroupMember', {
  member_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  group_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('LEADER', 'MEMBER'),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('PENDING','APPROVED','REJECTED'),
    allowNull: true
  },
  joined_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'group_members',
  timestamps: false
});

module.exports = GroupMember;