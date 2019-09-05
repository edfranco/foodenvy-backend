const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 30,
    },
    name: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 250
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date_joined: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false,
    },
    favorite_foods: {
        type: Array,
    },
    profile_image: {
        type: String,
        default: 'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
    ],
    favorite_restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restuarant"
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
