const router = require('express').Router();
const Mug = require('../models/mug');

router.get('/', (req, res) => {
  Mug.find({}).then((mugs) => {
    console.log(mugs);
    res.render('index', {mugs});
  });
});

router.post('/', (req, res) => {
  function isTrue(value) {
    if (value === 'true') {
      return true;
    } else {
      return false;
    }
  }
  let uniqueArr = [];
  if (req.body.uniqueCharacteristics !== '') {
    uniqueArr = req.body.uniqueCharacteristics.split(';');
  };
  let newAppearance = {
    color: req.body.color,
    style: req.body.style,
    material: req.body.material
  };
  let newMug = new Mug({
    name: req.body.name,
    appearance: {
      color: req.body.color,
      style: req.body.style,
      material: req.body.material
    },
    isDishwasherSafe: isTrue(req.body.isDishwasherSafe),
    isInsulated: isTrue(req.body.isInsulated),
    sizeInOunces: req.body.sizeInOunces,
    uniqueCharacteristics: uniqueArr
  });
  newMug.save().then((result) => {
    res.redirect('/');
  }).catch((err) => {
    throw err;
  });
});

router.get('/edit', (req, res) => {
  
});

router.put('/', (req, res) => {

  function isTrue(value) {
    if (value === 'true') {
      return true;
    } else {
      return false;
    }
  }
  let uniqueArr = [];
  if (req.body.uniqueCharacteristics !== '') {
    uniqueArr = req.body.uniqueCharacteristics.split(';');
  };
  let newAppearance = {
    color: req.body.color,
    style: req.body.style,
    material: req.body.material
  };
  let newMug = new Mug({
    name: req.body.name,
    appearance: {
      color: req.body.color,
      style: req.body.style,
      material: req.body.material
    },
    isDishwasherSafe: isTrue(req.body.isDishwasherSafe),
    isInsulated: isTrue(req.body.isInsulated),
    sizeInOunces: req.body.sizeInOunces,
    uniqueCharacteristics: uniqueArr
  });
  newMug.save().then((result) => {
    res.redirect('/');
  }).catch((err) => {
    throw err;
  });
});

module.exports = router;
