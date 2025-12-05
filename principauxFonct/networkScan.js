const { DataTypes } = require('sequelize');
const sequelize = require('../utile');
const DeviceSecurity = require('./deviceSecurity');

const NetworkScan = sequelize.define('NetworkScan', {
  insecure_http_detected:  {type: DataTypes.BOOLEAN},
  root_cert_installed:  {type: DataTypes.BOOLEAN},
  dns_mode: {type: DataTypes.STRING},
});

NetworkScan.belongsTo(DeviceSecurity, { foreignKey: 'device_id' });
DeviceSecurity.hasMany(NetworkScan, { foreignKey: 'device_id' });

module.exports = NetworkScan;