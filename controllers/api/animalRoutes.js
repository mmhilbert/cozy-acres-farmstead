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
router.post('/:animalId/farms', async (req, res) => {
    const { animalId } = req.params
    try {
        const user = await User.findByPk(req.session.user_id);
          
        const farm = await Farm.findOne({
            where: { user_id: user.id },
        });

        if (!farm) {
            res.status(400).json({ message: 'farm not found' });
            return;
        }

        const animal = await Animal.findByPk(animalId)

        if (animal.cost > user.current_gold) {
            res.status(400).json({ message: "You don't have enough gold to purchase this animal" });
            return;
        }

        user.current_gold -= animal.cost
        await user.save()

        const newAnimal = await FarmAnimal.create({
            name: req.body.name,
            farm_id: farm.id,
            animal_id: animalId
        })
        res.json(newAnimal)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error adding new Animal')
    }
})



module.exports = router




