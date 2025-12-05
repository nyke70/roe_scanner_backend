const { DataTypes } = require('sequelize');
const sequelize = require('../utile');

const DeviceSecurity = sequelize.define('DeviceSecurity', {
  device_id: { type: DataTypes.STRING, primaryKey: true },
  is_rooted: {type: DataTypes.BOOLEAN},
  bootloader_unlocked: {type: DataTypes.BOOLEAN},
  security_patch_level:{type: DataTypes.STRING},
  screen_lock_enabled: {type: DataTypes.BOOLEAN},
  biometric_enabled:{type: DataTypes.BOOLEAN},
  play_integrity_status:{type: DataTypes.STRING},
}, { timestamps: true });

module.exports = DeviceSecurity;