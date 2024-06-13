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
        const value = animal.animal.product.value
        const user = await User.increment({
            total_gold: +value,
            current_gold: +value
        }, {
            where: {
                id: 1 // req.session.user_id
            }
        })
        res.status(200).json(user[0][0][0].current_gold)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error feeding animal`)
    }
})

// collect product 
router.post('/:id/collect-product', async (req, res) => {
    const user = await User.findByPk(req.session.user_id)
    // get farm animal with animal and product included
    // get value of product
    //add value to current goal and total gold
    user.current_goal += product.value
    // set animal.product_ready = false 
})


module.exports = router

