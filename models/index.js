const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-envy';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(() => console.log('MongoDB is not connected'));

module.exports = {
    User: require('./User'),
    Post: require('./Post'),
    Restaurant: require('./Restaurant')
};