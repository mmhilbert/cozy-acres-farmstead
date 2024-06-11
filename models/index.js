const User = require('./User');
const Farm = require('./Farm')
const FarmAnimal = require('./FarmAnimal')
const Animal = require('./Animal')
const Product = require('./Product')



User.hasOne(Farm, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Farm.belongsTo(User, {
    foreignKey: 'user_id'
})

Farm.hasMany(FarmAnimal, {
    foreignKey: 'farm_id'
})

FarmAnimal.belongsTo(Farm, {
    foreignKey: 'farm_id'
})

Animal.belongsTo(Product, {
    foreignKey: 'product_id'
})

Animal.hasMany(FarmAnimal, {
    foreignKey: 'animal_id',
    onDelete: 'CASCADE'
})

FarmAnimal.belongsTo(Animal, {
    foreignKey: 'animal_id',
})


module.exports = { User, Farm, FarmAnimal, Animal, Product };
