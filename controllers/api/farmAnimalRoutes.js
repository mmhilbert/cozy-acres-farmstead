const router = require('express').Router();
const dayjs = require('dayjs')
const { User, Farm, FarmAnimal, Animal, Product} = require('../../models');


// feed a farm animal (post request, need farm animal id)
router.post('/:farmAnimalId/feed', async (req, res) => {
    const { farmAnimalId } = req.params
    try {
        const animal = await FarmAnimal.findByPk(farmAnimalId, {
            attributes: ['animal_id'],
            include: [{
                model: Animal,
                attributes: ['product_id'],
                include: [{
                    model: Product,
                    attributes: ['value']
                }]
            }]
        })
        farmAnimal.last_fed = dayjs().format('YYYY-MM-DD HH:mm:ss')
        await farmAnimal.save()
        const value = animal.animal.product.value
        const user = await User.increment({
            total_gold: +value,
            current_gold: +value
        }, {
            where: {
                id: req.session.user_id
            }
        })
        res.status(200).json(user[0][0][0].current_gold)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error feeding animal`)
    }
})

// unalive farm animal
router.post('/:farmAnimalId/animal-died', async (req, res) => {
    const { farmAnimalId } = req.params

    try {
        const animal = await FarmAnimal.findByPk(req.session.animal_id)
        animal.is_alive = false
        await animal.save()
        res.status(200).json(animal)
    } catch(err) {
        console.log(err)
    }
}) 


module.exports = router

