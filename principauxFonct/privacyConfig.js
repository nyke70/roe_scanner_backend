const { DataTypes } = require('sequelize');
const sequelize = require('../utile');
const DeviceSecurity = require('./deviceSecurity');

const PrivacyConfig = sequelize.define('PrivacyConfig', {
  app_id: {type: DataTypes.STRING},
  mic_usage_history: {type: DataTypes.TEXT},
  camera_usage_history: {type: DataTypes.TEXT},
  config_profiles: {type: DataTypes.TEXT},
});

PrivacyConfig.belongsTo(DeviceSecurity, { foreignKey: 'device_id' });
DeviceSecurity.hasMany(PrivacyConfig, { foreignKey: 'device_id' });

module.exports = PrivacyConfig;