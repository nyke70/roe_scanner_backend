const { DataTypes } = require('sequelize');
const sequelize = require('../utile');
const DeviceSecurity = require('./deviceSecurity');

const SecurityReport = sequelize.define('SecurityReport', {
  score: {type: DataTypes.INTEGER},
  recommendations: { type: DataTypes.TEXT},
  export_format: {type: DataTypes.STRING},
});

SecurityReport.belongsTo(DeviceSecurity, { foreignKey: 'device_id' });
DeviceSecurity.hasMany(SecurityReport, { foreignKey: 'device_id' });

module.exports = SecurityReport;