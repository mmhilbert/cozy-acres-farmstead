const router = require('express').Router();
const userRoutes = require('./userRoutes');
const farmRoutes = require('./farmRoutes')
const animalRoutes = require('./animalRoutes')
const farmAnimalRoutes = require('./farmAnimalRoutes')

router.use('/users', userRoutes);
router.use('/farms', farmRoutes)
router.use('/animals', animalRoutes)
router.use('/farmAnimals', farmAnimalRoutes)

module.exports = router;
