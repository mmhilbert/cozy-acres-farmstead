const sequelize = require("../config/connection");
const { User, Farm, FarmAnimal, Animals } = require("../models");

const userData = require("./userData.json");
const animalsData = require("./animalsData.json");
const farmData = require("./farmData.json");
const farmAnimalData = require("./farmAnimalData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
