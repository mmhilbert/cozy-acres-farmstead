const router = require("express").Router();
const { User, Farm, FarmAnimal, Animal, Product } = require("../models");
const withAuth = require("../utils/auth");

// STARTER CODE
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// new homepage route
router.get("/", withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      include: { all: true, nested: true },
    });
    
    const farm = await Farm.findOne({
      where: { user_id: user.id },
    });

    console.log(farm)
    let farm_animals = []
    if (farm) {
      const farmAnimals = await FarmAnimal.findAll({
        where: { farm_id: farm.id },
        include: [
          {
            model: Animal,
            include: [
              {
                model: Product,
              },
            ],
          },
        ],
      });
  
      farm_animals = farmAnimals.map((animal) => animal.toJSON());
    }


    res.render("homepage", {
      user: user.dataValues,
      farm: farm ? farm.dataValues: null,
      farm_animals,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/farmstore", async (req, res) => {
  try {
    const animals = await Animal.findAll();
    const user = await User.findByPk(req.session.user_id);
    res.render("farmstore", {
      user: user.dataValues,
      animals: animals.dataValues,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// route just for testing (DO NOT GO LIVE)
router.get("/login/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);

  req.session.save(() => {
    req.session.user_id = user.id;
    req.session.logged_in = true;

    res.redirect("/");
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
