const { Sequelize } = require('sequelize');

require('dotenv').config()



const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect:  'mysql'
  });

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connection Established Successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


testConnection();