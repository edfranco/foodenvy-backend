const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/project-wayfarer';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(() => console.log('error'));

module.exports = {
    User: require('./User'),
    Post: require('./Post'),
    Restaurant: require('./Restaurant')
}

