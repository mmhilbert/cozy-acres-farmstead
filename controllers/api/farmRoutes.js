const router = require('express').Router();
const { User, Farm, FarmAnimal, Animal} = require('../../models');

// '/api/farms' endpoint
// get all user farms
router.get('/', async (req, res) => {
    try {
        const farmData = await Farm.findAll()
        res.json(farmData)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error getting farms')
    }
})

// get individual farm
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const farmData = await Farm.findByPk(id, {
            include: [{model: User}]
        })
        res.json(farmData)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error getting farm ${id}`)
    }
})

//create farm




module.exports = router