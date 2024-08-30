import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('agroclima', 'root', 'Mugiwara23', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;
