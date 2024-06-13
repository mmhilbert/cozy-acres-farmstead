const router = require('express').Router();
const dayjs = require('dayjs')
const { User, Farm, FarmAnimal, Animal} = require('../../models');


// feed a farm animal (post request, need farm animal id)
router.post('/:id/feed', async (req, res) => {
    const { id } = req.params
    try {
        const farmAnimal = await FarmAnimal.findByPk(id)
        console.log(farmAnimal)
        farmAnimal.last_fed = dayjs().format('YYYY-MM-DD HH:mm:ss')
        farmAnimal.product_ready = true

        await farmAnimal.save()
        await farmAnimal.reload()
        res.status(200).json(farmAnimal)
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

