const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection; //shortcut variable
db.on('error', console.error.bind(console, "connection error:"))
db.once('open', () => {
  console.log("Database connected");
})

//Install express, mongoose using "npm i express mongoose ejs" on the command line.

const app = express();

app.set('view engine', 'ejs')

//__dirname is a Node.js global variable that represents the directory
// name of the current module. It's used to get the absolute path of the 
// current directory where your script is running.
// path.join with the current arguments combine the current directory
// 'dirname' with the 'views' folder, creating the absolute path to the views directory.
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home');
})

//Dynamically retrieve and render data from the database to be displayed
//on the page. The database variable 'campgrounds' must be passed as
//an argument and destructured in order to be utilized on a given web page
app.get('/campgrounds', async(req, res) => {
  const campgrounds = await Campground.find({})
  res.render('campgrounds/index', { campgrounds });
})

app.get('/campgrounds/:id', async(req, res) => {
  res.render('campgrounds/show');
})

app.listen(3000, () => {
  console.log('listening on port 3000');
  
})