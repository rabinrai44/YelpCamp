// required packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// port define
const port = process.env.PORT || 3000;

// connect mongoose
mongoose.connect('mongodb://localhost:27017/YelpCampDB', {
  useNewUrlParser: true
});

// Basic App setup
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Global variable - temporary data
let campgrounds = [
  {
    name: 'Campground 1',
    image: 'https://farm9.staticflickr.com/8235/8432294727_73ccb892f7.jpg'
  },
  {
    name: 'Campground 2',
    image: 'https://farm4.staticflickr.com/3617/3389236883_ef334dc46c.jpg'
  },
  {
    name: 'Campground 3',
    image: 'https://farm6.staticflickr.com/5786/20607281024_5c7b3635cc.jpg'
  }
];

// Campground Schema
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

// Compile Schema into the mongoose model
let Campground = mongoose.model('Campground', campgroundSchema);

/********* ROUTING ********/
//GET - /
app.get('/', (req, res) => {
  res.render('landing');
});

//GET - /campgrounds
app.get('/campgrounds', (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds', { campgrounds: allCampgrounds });
    }
  });
});

//POST - /campgrounds
app.post('/campgrounds', (req, res) => {
  // hold the incoming data in local variable
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name: name, image: image };

  // save Campground to the campgrounds
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      // redirect to campground page
      res.redirect('/campgrounds');
    }
  });
});

//GET - campgrounds/new
app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

// App listen
app.listen(port, () => console.log(`Server is running on port ${port}`));
