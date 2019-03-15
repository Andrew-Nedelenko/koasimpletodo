const Sequelize = require('sequelize');

const sequelize = new Sequelize('oskartestdb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },


});

const selfList = sequelize.define('todolists', {
  title: Sequelize.STRING,
  content: Sequelize.STRING,
  check: Sequelize.BOOLEAN,
  date: Sequelize.DATE,
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  sequelize, selfList,
};
