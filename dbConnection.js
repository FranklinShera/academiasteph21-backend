const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('as21', 'root', '', {
    host: 'localhost',
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