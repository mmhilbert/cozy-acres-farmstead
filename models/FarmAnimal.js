const { Model, DataTypes, NOW } = require("sequelize");
const sequelize = require("../config/connection");
const dayjs = require('dayjs')

const Farm = require("./Farm");
const Animal = require('./Animal')

class FarmAnimal extends Model {}

FarmAnimal.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Farm,
        key: 'id'
    }
  },
  animal_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Animal,
        key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_fed: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW
  },
  product_ready: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_alive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "farm_animal"
});

module.exports = FarmAnimal;
