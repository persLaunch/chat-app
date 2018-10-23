const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const app_config = require('../../config');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const configSequelize = require('./config/config.json')[env];

const db = {};

let sequelize;
if (configSequelize.use_env_variable) {
    sequelize = new Sequelize(process.env[configSequelize.use_env_variable], configSequelize);
} else {
    sequelize = new Sequelize(configSequelize.database, configSequelize.username, configSequelize.password, configSequelize);
}


fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


sequelize.sync({ force: app_config.SEQUELIZE_SYNC_FORCE });

module.exports = db;
