const { DataTypes } = require('sequelize');
const sequelize = require('../utile');
const DeviceSecurity = require('./deviceSecurity');

const InstalledApp = sequelize.define('InstalledApp', {
  app_id: { type: DataTypes.STRING, primaryKey: true },
  app_name: {type: DataTypes.STRING},
  permissions: {type: DataTypes.TEXT},
  is_admin:  {type: DataTypes.BOOLEAN},
  is_hidden:  {type: DataTypes.BOOLEAN},
  installed_from_store:  {type: DataTypes.BOOLEAN},
});

InstalledApp.belongsTo(DeviceSecurity, { foreignKey: 'device_id' });
DeviceSecurity.hasMany(InstalledApp, { foreignKey: 'device_id' });

module.exports = InstalledApp;