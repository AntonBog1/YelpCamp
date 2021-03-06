const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '603152cbe990d7b0c9acd93b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim libero maxime culpa ratione nemo rem explicabo quibusdam et consequuntur impedit placeat ullam dolorem temporibus quis excepturi eveniet modi, obcaecati vero?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dw9svxwdo/image/upload/v1614719492/YelpCamp/ipbsdizjeskbui33fxja.jpg',
                    filename: 'YelpCamp/ipbsdizjeskbui33fxja'
                },
                {
                    url: 'https://res.cloudinary.com/dw9svxwdo/image/upload/v1614719492/YelpCamp/kkezauzflrq3apb9v6vj.jpg',
                    filename: 'YelpCamp/kkezauzflrq3apb9v6vj'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})