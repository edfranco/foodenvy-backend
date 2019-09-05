const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 250,
    },
    time_posted: {
        type: Date,
        default: Date.now()
    },
    user_id: {
        type: String
    },
    restaurant_name: {
        type: String
    }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
