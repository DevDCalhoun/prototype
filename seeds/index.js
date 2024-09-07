/**
 * This file is used to seed fake data into the database we created.
 */

const mongoose = require('mongoose'); // mongoos is required to connect to MongoDB
const cities = require('./cities'); // import the cities file for data usage
const {places, descriptors} = require('./seedHelpers'); // import and destructure from the seedHelpers file
const Campground = require('../models/campground'); // import the model we created for the campground database

mongoose.connect('mongodb://localhost:27017/yelp-camp'); // connect the app to the database host and the correct database

const db = mongoose.connection; //shortcut variable too connect to mongoose and create the connection to the database
db.on('error', console.error.bind(console, "connection error:")); // Runs if their is an error connecting to the database
//event listener to connect to the database. This is ran only once, since we only need to connect to the database one time when the app runs.
db.once('open', () => {
  console.log("Database connected");
})

// This function searches for a random element in an array
const sample = (array) => array[Math.floor(Math.random() * array.length)]

// This function seeds data into the database using the cities and seedHelpers files.
const seedDB = async() => {
  await Campground.deleteMany({}); // waits for the database to delete all the elements in the database.
  
  //Loops 50 times to put 50 different elements of data into our database
  for(let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000); // generates a random number up to 1000
    //This adds a new Campground to our database usind the data we created in our campground models file.
    //First we add a location using the cities js file. We get the city and state data for the chosen element
    //and then we get the title of the campground from the seedHelpers file that we destructored into descriptors and places.
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`
    })
    await camp.save(); //wait for the campground to be saved to the database.
  }
}

seedDB();