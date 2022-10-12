var DataTypes = require("sequelize").DataTypes;

var _tutorial = require("./tutorial");

function initModels(sequelize) {
  var tutorial = _tutorial(sequelize, DataTypes);

  return {
    tutorial,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
