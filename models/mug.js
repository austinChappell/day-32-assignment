const mongoose = require('mongoose')
      Schema = mongoose.Schema;

const mugSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  appearance: {
    color: {
      type: String,
      required: true
    },
    style: {
      type: String,
      required: true
    },
    material: {
      type: String,
      required: true
    }
  },
  isDishwasherSafe: Boolean,
  isInsulated: Boolean,
  sizeInOunces: String,
  uniqueCharacteristics: []
});

const Mug = mongoose.model('Mug', mugSchema);

module.exports = Mug;
