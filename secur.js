const { DataTypes } = require('sequelize');
const sequelize = require('./utile');
const User = require('./user');

const Report = sequelize.define('Report', {
  score: DataTypes.INTEGER,
  details: DataTypes.JSON,
});

Report.belongsTo(User);
User.hasMany(Report);

module.exports = Report;