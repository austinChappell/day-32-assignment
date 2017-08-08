const router = require('express').Router();
const Mug = require('../models/mug');

router.get('/', (req, res) => {
  Mug.find({}).then((mugs) => {
    console.log(mugs);
    res.render('index', {mugs});
  });
});

router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', (req, res) => {
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

router.get('/show/:id', (req, res) => {
  let id = req.params.id;
  Mug.findById(id, (err, mug) => {
    if (err) {
      console.log(err);
    } else {
      console.log(mug);
      res.render('show', mug);
    };
  });
});

router.get('/edit/:id', (req, res) => {
  let id = req.params.id;
  let styleOptions = [
    { value: 'Thermos', selected: false },
    { value: 'Tumbler', selected: false },
    { value: 'Mug', selected: false }
  ];
  let materialOptions = [
    { value: 'Stainless Steel', selected: false },
    { value: 'Ceramic', selected: false },
    { value: 'Plastic', selected: false }
  ];
  let sizeOptions = [
    { value: '6 to 8 oz' },
    { value: '8 to 12 oz' },
    { value: '12 to 16 oz' },
    { value: '16 or more oz' }
  ];
  let dishwasherSafeOptions = [
    { value: true, groupName: 'isDishwasherSafe', text: 'Yes' },
    { value: false, groupName: 'isDishwasherSafe', text: 'No' }
  ];
  let insulatedOptions = [
    { value: true, groupName: 'isInsulated', text: 'Yes' },
    { value: false, groupName: 'isInsulated', text: 'No' }
  ];


  function getOptionsHTML(array, selectedValue) {
    let html = '';
    array.forEach((option) => {
      if (option.value === selectedValue) {
        html += `<option value="${ option.value }" selected>${ option.value }</option>\n`;
      } else {
        html += `<option value="${ option.value }">${ option.value }</option>\n`;
      }
    });
    return html;
  };

  function getRadioHTML(array, selectedValue) {
    let html = '';
    array.forEach((option) => {
      if (option.value === selectedValue) {
        html += `<input type="radio" name="${ option.groupName }" value="${ option.value }" checked> ${ option.text }\n`;
      } else {
        html += `<input type="radio" name="${ option.groupName }" value="${ option.value }" /> ${ option.text }\n`;
      }
    });
    return html;
  };

  Mug.findById(id, (err, mug) => {
    if (err) {
      console.log(err);
    } else {
      let style = getOptionsHTML(styleOptions, mug.appearance.style);
      let material = getOptionsHTML(materialOptions, mug.appearance.material);
      let size = getOptionsHTML(sizeOptions, mug.sizeInOunces);
      let dishwasherSafe = getRadioHTML(dishwasherSafeOptions, mug.isDishwasherSafe);
      let insulated = getRadioHTML(insulatedOptions, mug.isInsulated);
      let characteristics = mug.uniqueCharacteristics.join('; ');
      let data = { mug, style, material, size, dishwasherSafe, insulated, characteristics };
      console.log(data.style);
      res.render('edit', data);
    }
  });
});

router.put('/edit/:id', (req, res) => {
  let id = req.params.id;
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
  let editMug = {
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
  };

  Mug.update({ _id: id }, { $set: editMug }, (err, result) => {
    if (err) {
      console.log('ERROR=================', err);
    } else {
      res.redirect('/');
    };
  });
});

router.delete('/delete/:id', (req, res) => {
  let id = req.params.id;
  Mug.remove({ _id: id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
