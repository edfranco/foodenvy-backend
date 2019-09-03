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
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
