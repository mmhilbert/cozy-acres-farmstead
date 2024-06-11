const router = require('express').Router();
const { User, Farm, FarmAnimal, Animal} = require('../../models');

// '/api/animals' endpoint
// get animals
router.get('/', async (req, res) => {
    try {
        const animalData = await Animal.findAll()
        res.json(animalData)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error getting animals')
    }
})

// get individual animal
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const animalData = await Animal.findByPk(id)
        res.json(animalData)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error getting animal ${id}`)
    }
})

//add animal to farm (post request)
router.post('/:id/farms/:farm_id', async (req, res) => {
    const { id, farm_id } = req.params
    try {
        // get animal record from id
        // randomly pick color for animal
        // randomly pick gender
        const newAnimal = await FarmAnimal.create({
            name: req.body.name,
            farm_id: farm_id,
            animal_id: id
        })
        res.json(newAnimal)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error adding new Animal')
    }
})



module.exports = router




