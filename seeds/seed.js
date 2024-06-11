const sequelize = require("../config/connection");
const { User, Farm, FarmAnimal, Animal, Product } = require("../models");

const userData = require("./userData.json");
const animalData = require("./animalData.json");
const farmData = require("./farmData.json");
const farmAnimalData = require("./farmAnimalData.json");
const productData = require("./productData.json")

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
  
  await Product.bulkCreate(productData, {
    individualHooks: true,
    returning: true
  })

  await Animal.bulkCreate(animalData, {
    individualHooks: true,
    returning: true,
  });

  await FarmAnimal.bulkCreate(farmAnimalData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
