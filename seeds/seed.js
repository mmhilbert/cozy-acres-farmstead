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

  await Farm.bulkCreate(farmData, {
    individualHooks: true,
    returning: true,
  });

  await FarmAnimal.bulkCreate(farmAnimalData, {
    individualHooks: true,
    returning: true,
  });

  await Animals.bulkCreate(animalsData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
