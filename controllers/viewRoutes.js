const router = require('express').Router();
const { User, Farm, FarmAnimal } = require('../models');
const withAuth = require('../utils/auth');

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
router.get('/', withAuth, async (req, res) => {
  
  try {
    // const userData = await User.findAll({
    //   attributes: { exclude: ['password'] },
    //   order: [['name', 'ASC']],
    // });
    const user = User.findByPk(req.session.user_id, {
      include: { all: true, nested: true }
    })

    res.render('homepage', {
      user,
      farm: user.farm,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup')
})

module.exports = router;
