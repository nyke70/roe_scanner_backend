const { DataTypes } = require('sequelize');
const sequelize = require('../utile');
const DeviceSecurity = require('./deviceSecurity');

const DataLeak = sequelize.define('DataLeak', {
  user_email: {type: DataTypes.STRING},
  phone_number: {type: DataTypes.STRING},
  is_compromised: {type: DataTypes.BOOLEAN},
  last_checked: {type: DataTypes.DATE},
});

DataLeak.belongsTo(DeviceSecurity, { foreignKey: 'device_id' });
DeviceSecurity.hasMany(DataLeak, { foreignKey: 'device_id' });

module.exports = DataLeak;