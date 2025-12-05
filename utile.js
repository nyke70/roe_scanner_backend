const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('scanner_db','root','', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports=sequelize;