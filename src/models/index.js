let dbConfig = require("../config/db.config1.js");

const initModel = require("./init-models");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    underscored: true,
  },
});

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db = require("./misc.js")(sequelize, Sequelize, db);
const model = initModel(sequelize);

Object.keys(model).map((k, i) => {
  return (db[k] = model[k]);
});

module.exports = db;
