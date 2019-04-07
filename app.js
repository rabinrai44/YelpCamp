// required packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// port define
const port = process.env.PORT || 3000;

// Basic App setup
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

/********* ROUTING ********/
//GET - /
app.get('/', (req, res) => {
  res.render('landing');
});

//GET - /campgrounds
app.get('/campgrounds', (req, res) => {
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
  res.render('campgrounds', { campgrounds: campgrounds });
});

// App listen
app.listen(port, () => console.log(`Server is running on port ${port}`));
