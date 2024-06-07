const router = require('express').Router();
const userRoutes = require('./userRoutes');
const farmRoutes = require('./farmRoutes')

router.use('/users', userRoutes);
router.use('/farms', farmRoutes)

module.exports = router;
