const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose'),
      mustache = require('mustache-express');

const router = require('./routes/routes');

let port = process.env.PORT || 3000;
let url = 'mongodb://localhost:27017/coffee_mugs';

mongoose.Promise = global.Promise;
mongoose.connect(url, { useMongoClient: true });

app.engine('mustache', mustache());

app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/', router);

app.listen(port, () => {
  console.log(`Your app is running on PORT ${ port }`);
});
