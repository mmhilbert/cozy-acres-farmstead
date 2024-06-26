const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body)

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true

      res.status(200).json(userData)
    })
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// get individual user for testing
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: { all: true, nested: true }
    })
    console.log(user)

    res.status(200).json({
      user: user,
      farm: user.farm,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/score', async (req, res) => {
  try {
    const users = await User.findAll()
    let userScore = []
    for (const user of users){
      const obj = {}
      const userName = user.dataValues.name
      const totalScore = user.dataValues.total_gold
      userScore.push({
        name: userName, score: totalScore
      })
    }
    userScore.sort((a,b) => b.score - a.score)
    const topFive = userScore.slice(0,5)
    res.status(200).json(topFive);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/scoreall', async (req, res) => {
  try {
    const users = await User.findAll()
    let userScore = 0
    for (const user of users){
      const obj = {}
      const totalScore = user.dataValues.total_gold
      userScore = userScore + totalScore
    }
    res.status(200).json(userScore);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;