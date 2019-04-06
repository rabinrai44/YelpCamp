// required packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// port define
const port = process.env.PORT || 3000;

// Basic App setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

/********* ROUTING ********/
//GET - /
app.get('/', (req, res) => {
  res.send('HomePage');
});

// App listen
app.listen(port, () => console.log(`Server is running on port ${port}`));
