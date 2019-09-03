const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    location: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    customers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
